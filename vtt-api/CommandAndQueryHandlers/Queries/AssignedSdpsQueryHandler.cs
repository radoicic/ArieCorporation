using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler]
    public class AssignedSdpsQueryHandler : AbstractVttRequestHandler<AssignedSdpsQuery, List<RegionForUi>>
    {
        private readonly VttContext _vttContext;
        public AssignedSdpsQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<List<RegionForUi>>> Handle(AssignedSdpsQuery request, CancellationToken cancellationToken)
        {
            List<RegionForUi> assignedSdps = new();
            foreach(var assignment in request.VttClaims.UserRegionAssignments)
            {
                if(assignment.CountryId != null)
                {
                    if(assignment.ProvinceId != null)
                    {
                        if(assignment.DistrictId != null)
                        {
                            if(assignment.VillageId != null)
                            {
                                if(assignment.SdpId != null)
                                {
                                    assignedSdps.Add((from sdp in _vttContext.Sdps
                                                      where sdp.SdpId == assignment.SdpId
                                                      select new RegionForUi()
                                                      {
                                                          Id = sdp.SdpId,
                                                          Name = sdp.SdpName,
                                                          RegionType = RegionType.Sdp
                                                      }).First());
                                }
                                else // all sdps
                                {
                                    assignedSdps.AddRange((from sdp in _vttContext.Sdps
                                                where sdp.VillageId == assignment.VillageId
                                                select new RegionForUi()
                                                {
                                                    Id = sdp.SdpId,
                                                    Name = sdp.SdpName,
                                                    RegionType = RegionType.Sdp
                                                }).ToList());
                                }
                            }
                            else // all villages
                            {
                                assignedSdps.AddRange((from sdp in _vttContext.Sdps
                                            join village in _vttContext.Villages on sdp.VillageId equals village.VillageId
                                            where village.DistrictId == assignment.DistrictId
                                            select new RegionForUi()
                                            {
                                                Id = sdp.SdpId,
                                                Name = sdp.SdpName,
                                                RegionType = RegionType.Sdp
                                            }).ToList());
                            }
                        }
                        else // all districts
                        {
                            assignedSdps.AddRange((from sdp in _vttContext.Sdps
                                        join village in _vttContext.Villages on sdp.VillageId equals village.VillageId
                                        join district in _vttContext.Districts on village.DistrictId equals district.DistrictId
                                        join province in _vttContext.Provinces on district.ProvinceId equals province.ProvinceId
                                        where province.ProvinceId == assignment.ProvinceId
                                        select new RegionForUi()
                                        {
                                            Id = sdp.SdpId,
                                            Name = sdp.SdpName,
                                            RegionType = RegionType.Sdp
                                        }).ToList());
                        }
                    }
                    //TO-DO: consider pagination for admin an super user and/or consider stored procedure
                    else // all provinces (admin)
                    {
                        assignedSdps.AddRange((from sdp in _vttContext.Sdps
                                    join village in _vttContext.Villages on sdp.VillageId equals village.VillageId
                                    join district in _vttContext.Districts on village.DistrictId equals district.DistrictId
                                    join province in _vttContext.Provinces on district.ProvinceId equals province.ProvinceId
                                    join country in _vttContext.Countries on province.CountryId equals country.CountryId
                                    where country.CountryId == assignment.CountryId
                                    select new RegionForUi()
                                    {
                                        Id = sdp.SdpId,
                                        Name = sdp.SdpName,
                                        RegionType = RegionType.Sdp
                                    }).ToList());
                    }
                }
                else // all countries (super user)
                {
                    assignedSdps.AddRange((from sdp in _vttContext.Sdps
                                           select new RegionForUi()
                                           {
                                               Id = sdp.SdpId,
                                               Name = sdp.SdpName,
                                               RegionType = RegionType.Sdp
                                           }).ToList());
                }
            }
            return Success(assignedSdps);
        }
    }
}
