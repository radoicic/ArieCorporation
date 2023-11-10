using Newtonsoft.Json;
using System.Security.Claims;
using Vtt_Api.Domain.DataAccess;

namespace Vtt_Api.Domain.Dtos
{
    public class VttClaims
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public List<UserModuleAccessView> UserModuleAccessViews { get; set; }
        public List<RegionAssignmentForUi> UserRegionAssignments { get; set; }
        [JsonIgnore]
        public ClaimsIdentity ClaimsIdentity { get; set; }

    }
}
