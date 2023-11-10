using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Regions", ModuleAction.Edit)]
    public class UpdateRegionCommandHandler : AbstractVttRequestHandler<UpdateRegionCommand, RegionForUi>
    {
        public readonly VttContext _vttContext;
        public UpdateRegionCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<RegionForUi>> Handle(UpdateRegionCommand request, CancellationToken cancellationToken)
        {
            var region = new RegionForUi()
            {
                Id = request.Id,
                Name = request.Name,
                Lat = request.Lat,
                Long = request.Long,
                RegionType = request.RegionType,
                LookupCountryId= request.LookupCountryId
            };
            switch (request.RegionType)
            {
                case RegionType.Country:
                    var country = _vttContext.Countries.FirstOrDefault(country => country.CountryId == request.Id);
                    if(country == null)
                    {
                        return NotFound();
                    }
                    country.CountryName = region.Name;
                    country.Lat = region.Lat;
                    country.Long = region.Long;
                    country.LookupCountryId = (short)region.LookupCountryId;
                    _vttContext.Update(country);
                    break;
                case RegionType.Province:
                    var province = _vttContext.Provinces.FirstOrDefault(province => province.ProvinceId == request.Id);
                    if(province == null)
                    {
                        return NotFound();
                    }
                    province.ProvinceName = region.Name;
                    province.Lat = region.Lat;
                    province.Long = region.Long;
                    _vttContext.Update(province);
                    break;
                case RegionType.District:
                    var district = _vttContext.Districts.FirstOrDefault(district => district.DistrictId == request.Id);
                    if(district == null) { return NotFound(); }
                    district.DistrictName = region.Name;
                    district.Lat = region.Lat;
                    district.Long = region.Long;
                    _vttContext.Update(district);
                    break;
                case RegionType.Village:
                    var village = _vttContext.Villages.FirstOrDefault(village => village.VillageId == request.Id);
                    if(village == null)
                    {
                        return NotFound();
                    }
                    village.VillageName = region.Name;
                    village.Lat = region.Lat;
                    village.Long = region.Long;
                    _vttContext.Update(village);
                    break;
                case RegionType.Sdp:
                    var sdp = _vttContext.Sdps.FirstOrDefault(sdp => sdp.SdpId == request.Id);
                    if(sdp == null)
                    {
                        return NotFound();
                    }
                    sdp.SdpName = region.Name;
                    sdp.Lat = region.Lat;
                    sdp.Long = region.Long;
                    _vttContext.Update(sdp);
                    break;
                default: throw new ArgumentException(request.RegionType.ToString());
            }
            await _vttContext.SaveChangesAsync();
            return Success(region);
        }
    }
}
