using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    public class LoginCommandHandler : AbstractVttRequestHandler<LoginCommand, SessionForUi>
    {
        private readonly VttContext _context;
        private readonly ICryptoService _cryptoService;
        private readonly IClaimsService _claimsService;
        private readonly IMessagingService _messagingService;
        public LoginCommandHandler(VttContext context, ICryptoService cryptoService, IClaimsService claimsService, IMessagingService messagingService) 
        {
            _context = context;
            _cryptoService = cryptoService;
            _claimsService = claimsService;
            _messagingService = messagingService;
        }

        public override async Task<VttHandlerResponse<SessionForUi>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            
            var user = (from userRow in _context.Users 
                        where userRow.Email == request.Email 
                        select userRow).FirstOrDefault();
            if (user == null)
            {
                return Challenge("User not found");
            }
            if(!_cryptoService.Verify(request.Password, user.PasswordHash))
            {
                return Challenge("Wrong Password");
            }
            if (!string.IsNullOrEmpty(request.Otp))
            {
                if (!_cryptoService.Verify(request.Otp, user.OtpHash))
                {
                    return Challenge("Wrong OTP");
                }
                user.OtpHash = null; // clear after single use
                await _context.SaveChangesAsync(cancellationToken);
                var userModuleAccessViews = _context.UserModuleAccessViews.Where(x => x.UserId == user.UserId).ToList();
                var userRegionAssignments = (from ura in _context.UserRegionAssignments
                                            where ura.UserId == user.UserId
                                            select new RegionAssignmentForUi()
                                            {
                                                CountryId = ura.CountryId,
                                                ProvinceId = ura.ProvinceId,
                                                DistrictId = ura.DistrictId,
                                                VillageId = ura.VillageId,
                                                SdpId = ura.SdpId
                                            }).ToList();
                if (!userRegionAssignments.Any() || !userModuleAccessViews.Any())
                {
                    return NotAllowed("Access Denied");
                }
                var sessionForUi = new SessionForUi()
                {
                    Token = _claimsService.CreateTokenAsync(user, userModuleAccessViews, userRegionAssignments),
                    Claims = new VttClaims()
                    {
                        Email = request.Email,
                        UserId = user.UserId + "",
                        UserModuleAccessViews = userModuleAccessViews,
                        UserRegionAssignments = userRegionAssignments
                    }
                };
                return Success(sessionForUi);
            }
            else
            {
                var code = _cryptoService.GeneratePassword();
                user.OtpHash = _cryptoService.Hash(code);

                //await _context.SaveChangesAsync(cancellationToken);
                //await _messagingService.SendSms(code, user.Phone);
                //return Success(null, "OTP generated"); // do NOT send OTP back to client in this function!

                var userModuleAccessViews = _context.UserModuleAccessViews.Where(x => x.UserId == user.UserId).ToList();
                var userRegionAssignments = (from ura in _context.UserRegionAssignments
                                             where ura.UserId == user.UserId
                                             select new RegionAssignmentForUi()
                                             {
                                                 CountryId = ura.CountryId,
                                                 ProvinceId = ura.ProvinceId,
                                                 DistrictId = ura.DistrictId,
                                                 VillageId = ura.VillageId,
                                                 SdpId = ura.SdpId
                                             }).ToList();
                if (!userRegionAssignments.Any() || !userModuleAccessViews.Any())
                {
                    return NotAllowed("Access Denied");
                }
                var sessionForUi = new SessionForUi()
                {
                    Token = _claimsService.CreateTokenAsync(user, userModuleAccessViews, userRegionAssignments),
                    Claims = new VttClaims()
                    {
                        Email = request.Email,
                        UserId = user.UserId + "",
                        UserModuleAccessViews = userModuleAccessViews,
                        UserRegionAssignments = userRegionAssignments
                    }
                };
                return Success(sessionForUi);
            }
        }
    }
}
