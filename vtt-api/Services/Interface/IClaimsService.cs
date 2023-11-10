using System;
using System.Collections.Generic;
using System.Security.Claims;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.Services.Interface
{
    public interface IClaimsService
    {
        List<Claim>? GetClaims();
        VttClaims? PrepareVttClaims(List<Claim>? claims);
        string CreateTokenAsync(User user, List<UserModuleAccessView> userModuleAccessViews, List<RegionAssignmentForUi> userRegionAssignments);
    }
}
