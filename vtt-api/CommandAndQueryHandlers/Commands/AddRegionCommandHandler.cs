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
    [AuthorizeVttHandler("Regions", ModuleAction.Add)]
    public class AddRegionCommandHandler : AbstractVttRequestHandler<AddRegionCommand, RegionForUi>
    {
        public readonly VttContext _vttContext;
        public AddRegionCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<RegionForUi>> Handle(AddRegionCommand request, CancellationToken cancellationToken)
        {
            var region = new RegionForUi()
            {
                Name = request.Name,
                Lat = request.Lat,
                Long = request.Long,
                RegionType = request.RegionType,
                LookupCountryId = request.LookupCountryId
            };
            switch(request.RegionType)
            {
                case RegionType.Country:
                    var country = new Country()
                    {
                        CountryName = region.Name,
                        Lat = region.Lat,
                        Long = region.Long,
                        LookupCountryId = (short)region.LookupCountryId
                    };
                    _vttContext.Countries.Add(country);
                    await _vttContext.SaveChangesAsync(cancellationToken);
                    region.Id = country.CountryId;
                    break;
                case RegionType.Province:
                    var province = new Province()
                    {
                        ProvinceName = region.Name,
                        Lat = region.Lat,
                        Long = region.Long,
                        CountryId = (short)request.ParentId
                    };
                    _vttContext.Provinces.Add(province);
                    await _vttContext.SaveChangesAsync(cancellationToken);
                    region.Id = province.ProvinceId;
                    break;
                case RegionType.District:
                    var district = new District()
                    {
                        DistrictName = region.Name,
                        Lat = region.Lat,
                        Long = region.Long,
                        ProvinceId = (int)request.ParentId
                    };
                    _vttContext.Districts.Add(district);
                    await _vttContext.SaveChangesAsync(cancellationToken);
                    region.Id = district.DistrictId;
                    break;
                case RegionType.Village:
                    var village = new Village()
                    {
                        VillageName = region.Name,
                        Lat = region.Lat,
                        Long = region.Long,
                        DistrictId = (int)request.ParentId
                    };
                    _vttContext.Villages.Add(village);
                    await _vttContext.SaveChangesAsync(cancellationToken);
                    region.Id = village.DistrictId;
                    break;
                case RegionType.Sdp:
                    var sdp = new Sdp()
                    {
                        SdpName = region.Name,
                        Lat = region.Lat,
                        Long = region.Long,
                        VillageId = (int)request.ParentId
                    };
                    _vttContext.Sdps.Add(sdp);
                    await _vttContext.SaveChangesAsync(cancellationToken);
                    region.Id = sdp.SdpId;
                    break;
                default: throw new ArgumentException(request.RegionType.ToString());
            }
            return Success(region);
        }
    }
}
