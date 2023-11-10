using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Services
{
    public class ClaimsService : IClaimsService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public ClaimsService(IHttpContextAccessor httpContextAccessor, IConfiguration configuration) 
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(paramName: nameof(httpContextAccessor));
            _config = configuration;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:key"]));
        }
        public List<Claim>? GetClaims() => _httpContextAccessor.HttpContext.User?.Claims?.ToList();

        public VttClaims? PrepareVttClaims(List<Claim>? claims = null)
        {
            claims ??= GetClaims();
            if (claims == null)
                return null;
            ClaimsIdentity claimsIdentity = new(from claimKeyValuePair in claims
                                                select new Claim(claimKeyValuePair.Type, claimKeyValuePair.Value));
            return new VttClaims()
            {
                Email = (claimsIdentity.HasClaim((Claim c) => c.Type == ClaimTypes.Email) ? claimsIdentity.Claims.First((Claim c) => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value.ToLower() : string.Empty),
                UserId = claimsIdentity.Claims.First((Claim c) => c.Type == ClaimTypes.Sid).Value,
                UserModuleAccessViews = JsonConvert.DeserializeObject<List<UserModuleAccessView>>(claimsIdentity.Claims.First((Claim c) => c.Type == "UserModuleAccessViews").Value),
                UserRegionAssignments = JsonConvert.DeserializeObject<List<RegionAssignmentForUi>>(claimsIdentity.Claims.First((Claim c) => c.Type == "UserRegionAssignments").Value),
                ClaimsIdentity = claimsIdentity
            };
        }

        public string CreateTokenAsync(User user, List<UserModuleAccessView> userModuleAccessViews, List<RegionAssignmentForUi> userRegionAssignments)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Sid, $"{user.UserId}"),
                new Claim("UserModuleAccessViews", JsonConvert.SerializeObject(userModuleAccessViews)),
                new Claim("UserRegionAssignments", JsonConvert.SerializeObject(userRegionAssignments))
            };
            var token = GenerateToken(claims);
            return token;
        }

        private string GenerateToken(List<Claim> claims)
        {
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["Token:Issuer"]
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
