using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Regions", ModuleAction.View)]
    public class GetRegionDetailsQueryHandler : AbstractVttRequestHandler<GetRegionDetailsQuery, RegionDetailsResult>
    {
        public readonly VttContext _vttContext;
        public GetRegionDetailsQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }

        public async override Task<VttHandlerResponse<RegionDetailsResult>> Handle(GetRegionDetailsQuery request, CancellationToken cancellationToken)
        {
            RegionDetailsResult result = new()
            {
                Id = request.Id,
                RegionType = request.RegionType
            };
            
            switch (request.RegionType)
            {
                case null:

                    result.SubRegions = (from row in _vttContext.CountSubRegionsViews
                                         select new RegionForUi()
                                         {
                                             Id = (int)row.Id,
                                             Name = row.Name,
                                             Lat = row.Lat,
                                             Long = row.Long,
                                             RegionType = (RegionType)row.RegionType,
                                             ProvinceCount = row.ProvinceCount,
                                             DistrictCount = row.DistrictCount,
                                             VillageCount = row.VillageCount,
                                             SdpCount = row.SdpCount,
                                             SmallCode = row.SmallCode
                                         }).ToList();
                    break;
                case RegionType.Country:
                    var countriesQuery = _vttContext.Countries.Where(x => x.CountryId == request.Id);
                    result.ParentCountry = (from country in countriesQuery
                                            join lc in _vttContext.LookupCountries on country.LookupCountryId equals lc.LookupCountryId
                                            select new RegionForUi()
                                            {
                                                Id = country.CountryId,
                                                Name = country.CountryName,
                                                Lat = country.Lat,
                                                Long = country.Long,
                                                RegionType = RegionType.Country,
                                                SmallCode = lc.Code,
                                            }).FirstOrDefault();

                    result.SubRegions = (from row in _vttContext.CountSubRegionsViews.FromSql($"EXEC sp_countSubRegionsByCountry {request.Id}").AsEnumerable()
                                         select new RegionForUi()
                                         {
                                             Id = (int)row.Id,
                                             Name = row.Name,
                                             Lat = row.Lat,
                                             Long = row.Long,
                                             RegionType = (RegionType)row.RegionType,
                                             ProvinceCount = row.ProvinceCount,
                                             DistrictCount = row.DistrictCount,
                                             VillageCount = row.VillageCount,
                                             SdpCount = row.SdpCount,
                                         }).ToList();
                    break;
                case RegionType.Province:
                    var provincesQuery = _vttContext.Provinces.Where(x => x.ProvinceId == request.Id);
                    result.ParentProvince = (from province in provincesQuery
                                             select new RegionForUi()
                                             {
                                                 Id = province.ProvinceId,
                                                 Name = province.ProvinceName,
                                                 Lat = province.Lat,
                                                 Long = province.Long,
                                                 RegionType = RegionType.Province
                                             }).FirstOrDefault();
                    result.SubRegions = (from row in _vttContext.CountSubRegionsViews.FromSql($"EXEC sp_countSubRegionsByProvince {request.Id}").AsEnumerable()
                                                             select new RegionForUi()
                                                             {
                                                                 Id = (int)row.Id,
                                                                 Name = row.Name,
                                                                 Lat = row.Lat,
                                                                 Long = row.Long,
                                                                 RegionType = (RegionType)row.RegionType,
                                                                 DistrictCount = row.DistrictCount,
                                                                 VillageCount = row.VillageCount,
                                                                 SdpCount = row.SdpCount,
                                                             }).ToList();
                    result.ParentCountry = (from country in provincesQuery.Select(x => x.Country)
                                            select new RegionForUi()
                                            {
                                                Id = country.CountryId,
                                                Name = country.CountryName,
                                                Lat = country.Lat,
                                                Long = country.Long,
                                                RegionType = RegionType.Country,
                                            }).FirstOrDefault();
                    break;
                case RegionType.District:
                    var districtQuery = _vttContext.Districts.Where(x => x.DistrictId == request.Id);
                    result.ParentDistrict = (from district in districtQuery
                                            select new RegionForUi()
                                            {
                                                Id = district.DistrictId,
                                                Name = district.DistrictName,
                                                Lat = district.Lat,
                                                Long = district.Long,
                                                RegionType = RegionType.District,
                                            }).FirstOrDefault();
                    result.SubRegions = (from row in _vttContext.CountSubRegionsViews.FromSql($"EXEC sp_countSubRegionsByDistrict {request.Id}").AsEnumerable()
                                                             select new RegionForUi()
                                                             {
                                                                 Id = (int)row.Id,
                                                                 Name = row.Name,
                                                                 Lat = row.Lat,
                                                                 Long = row.Long,
                                                                 RegionType = (RegionType)row.RegionType,
                                                                 VillageCount = row.VillageCount,
                                                                 SdpCount = row.SdpCount,
                                                             }).ToList();
                    result.ParentProvince = (from province in districtQuery.Select(x => x.Province)
                                             select new RegionForUi()
                                             {
                                                 Id = province.ProvinceId,
                                                 Name = province.ProvinceName,
                                                 Lat = province.Lat,
                                                 Long = province.Long,
                                                 RegionType = RegionType.Province,

                                             }).FirstOrDefault();
                    result.ParentCountry = (from country in districtQuery.Select(x => x.Province.Country)
                                            select new RegionForUi()
                                            {
                                                Id = country.CountryId,
                                                Name = country.CountryName,
                                                Lat = country.Lat,
                                                Long = country.Long,
                                                RegionType = RegionType.Country,
                                            }).FirstOrDefault();
                    break;
                case RegionType.Village:
                    result.ParentVillage = (from village in _vttContext.Villages
                                            where village.VillageId == request.Id
                                            select new RegionForUi()
                                            {
                                                Id = village.VillageId,
                                                Name = village.VillageName,
                                                Lat = village.Lat,
                                                Long = village.Long,
                                                RegionType = RegionType.Village
                                            }).FirstOrDefault();
                    var sdpQuery = (from sdp in _vttContext.Sdps
                                         where sdp.VillageId == request.Id
                                         select sdp);
                    result.SubRegions = (from row in sdpQuery
                                         select new RegionForUi()
                                         {
                                             Id = (int)row.SdpId,
                                             Name = row.SdpName,
                                             Lat = row.Lat,
                                             Long = row.Long,
                                             RegionType = RegionType.Sdp,
                                         }).ToList();

                    result.ParentDistrict = (from sdp in sdpQuery
                                             select new RegionForUi()
                                             {
                                                 Id = sdp.Village.District.DistrictId,
                                                 Name = sdp.Village.District.DistrictName,
                                                 Lat = sdp.Village.District.Lat,
                                                 Long = sdp.Village.District.Long,
                                                 RegionType = RegionType.District,
                                             }).FirstOrDefault();
                    result.ParentProvince = (from sdp in sdpQuery
                                             select new RegionForUi()
                                             {
                                                 Id = sdp.Village.District.Province.ProvinceId,
                                                 Name = sdp.Village.District.Province.ProvinceName,
                                                 Lat = sdp.Village.District.Province.Lat,
                                                 Long = sdp.Village.District.Province.Long,
                                                 RegionType = RegionType.Province,

                                             }).FirstOrDefault();
                    result.ParentCountry = (from sdp in sdpQuery
                                            select new RegionForUi()
                                            {
                                                Id = sdp.Village.District.Province.CountryId,
                                                Name = sdp.Village.District.Province.Country.CountryName,
                                                Lat = sdp.Village.District.Province.Country.Lat,
                                                Long = sdp.Village.District.Province.Country.Long,
                                                RegionType = RegionType.Country,
                                            }).FirstOrDefault();
                    break;
            }// TO-DO: Consider using a view for the more complex queries
            return Success(result);
        }
    }
}
