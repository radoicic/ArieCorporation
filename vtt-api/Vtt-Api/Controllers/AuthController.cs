using Microsoft.AspNetCore.Mvc;
using MediatR;
using Vtt_Api.Services.Interface;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : AbstractVttController
    {
        private readonly IMediator _mediatR;
        public AuthController(IMediator mediatR, ILoggerService loggerService) : base(loggerService)
        {
            _mediatR = mediatR;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginCommand loginCommand)
        {
            VttHandlerResponse<SessionForUi> result = new();
            try
            {
                result = await _mediatR.Send(loginCommand);
                if (result.HandlerResponseState != CommandAndQueryProtocol.Enums.HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok(result.Data);
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }
            
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> InitiatePasswordReset([FromBody] InitiatePasswordResetCommand initiatePasswordResetCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediatR.Send(initiatePasswordResetCommand);
                if (result.HandlerResponseState != CommandAndQueryProtocol.Enums.HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }
            
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand resetPasswordCommand)
        {
            VttHandlerResponse result = new();
            try
            {
                result = await _mediatR.Send(resetPasswordCommand);
                if (result.HandlerResponseState != CommandAndQueryProtocol.Enums.HandlerResponseState.Success)
                {
                    return await HandleError(result);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return await HandleError(result, ex);
            }
            
        }
    }
}
