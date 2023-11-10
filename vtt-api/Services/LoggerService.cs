using Microsoft.Extensions.Logging;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly VttContext _vttContext;
        private readonly IClaimsService _claimsService;
        public LoggerService(VttContext vttContext, IClaimsService claimsService)
        {
            _vttContext = vttContext;
            _claimsService = claimsService;
        }
        public async Task Log(LogLevel logLevel, string message, string details)
        {
            int? loggedInUser = null;
            try
            {
                var claims = _claimsService.GetClaims();
                if (claims != null && claims.Any())
                {
                    var success = int.TryParse(_claimsService.PrepareVttClaims(claims).UserId, out int loggedInUserInt);
                    if (success)
                    {
                        loggedInUser = loggedInUserInt;
                    }
                }
                _vttContext.Logs.Add(new Log()
                {
                    Timestamp = DateTime.UtcNow,
                    LogLevel = (byte)logLevel,
                    Message = message,
                    Details = details,
                    LoggedInUserId = loggedInUser
                });
                await _vttContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                message = "Error trying to log: " + message;
                details = e.ToString() + "\n\n ---- Original Log ----" + details;
                // TO-DO: Handle fatal error, log to file
                throw e;
            }
        }
    }
}
