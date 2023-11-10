using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandAndQueryHandlers.Shared
{
    public static class Extensions
    {
        public static bool HasSdpAuthorization(this List<RegionAssignmentForUi> userRegionAssignments, int sdpId, VttContext vttContext)
        {
            var requestedAccess = (from sdp in vttContext.Sdps
                                   join village in vttContext.Villages on sdp.VillageId equals village.VillageId
                                   join district in vttContext.Districts on village.DistrictId equals district.DistrictId
                                   join province in vttContext.Provinces on district.ProvinceId equals province.ProvinceId
                                   join country in vttContext.Countries on province.CountryId equals country.CountryId
                                   select new RegionAssignmentForUi()
                                   {
                                       CountryId = country.CountryId,
                                       ProvinceId = province.ProvinceId,
                                       DistrictId = district.DistrictId,
                                       VillageId = village.VillageId,
                                       SdpId = sdpId
                                   }).FirstOrDefault();
            foreach (var regionAssignment in userRegionAssignments)
            {
                if (regionAssignment.CountryId == null) // ex: super user or admin
                {
                    return true;
                }
                if (regionAssignment.CountryId != requestedAccess.CountryId)
                {
                    continue;
                }
                if (regionAssignment.ProvinceId == null) // ex: Level 4 access
                {
                    return true;
                }
                if (regionAssignment.ProvinceId != requestedAccess.ProvinceId)
                {
                    continue;
                }
                if (regionAssignment.DistrictId == null) // ex: Level 3 access
                {
                    return true;
                }
                if (regionAssignment.DistrictId != requestedAccess.DistrictId)
                {
                    continue;
                }
                if (regionAssignment.VillageId == null) // ex Level 2 access
                {
                    return true;
                }
                if (requestedAccess.VillageId != requestedAccess.VillageId)
                {
                    continue;
                }
                if (regionAssignment.SdpId == null || regionAssignment.SdpId == requestedAccess.SdpId)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
