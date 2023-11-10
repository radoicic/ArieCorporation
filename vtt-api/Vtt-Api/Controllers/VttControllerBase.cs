using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Controllers
{
    public class AbstractVttController : ControllerBase
    {
        private readonly ILoggerService _loggerService;
        public AbstractVttController(ILoggerService loggerService) 
        {
            _loggerService = loggerService;
        }
        protected async Task<IActionResult> HandleError(VttHandlerResponse vttHandlerResponse, Exception? ex = null)
        {
            if (string.IsNullOrEmpty(vttHandlerResponse.HandlerResponseMessage))
            {
                vttHandlerResponse.HandlerResponseMessage = "Unknown error";
            }
            switch(vttHandlerResponse.HandlerResponseState)
            {
                case HandlerResponseState.Success:
                    await _loggerService.Log(LogLevel.Warning, "Error handler called on success", $"URL: {HttpContext.Request.GetDisplayUrl()}");
                    return Ok();
                case HandlerResponseState.AuthenticationError:
                    await _loggerService.Log(LogLevel.Warning, $"Unauthenticated access attempt - {vttHandlerResponse.HandlerResponseMessage}", $"URL: {HttpContext.Request.GetDisplayUrl()}");
                    return Unauthorized(vttHandlerResponse.HandlerResponseMessage);
                case HandlerResponseState.AuthorizationError:
                    await _loggerService.Log(LogLevel.Warning, $"Unauthorized access attempt - {vttHandlerResponse.HandlerResponseMessage}", $"URL: {HttpContext.Request.GetDisplayUrl()}");
                    return StatusCode(403, vttHandlerResponse.HandlerResponseMessage);
                case HandlerResponseState.NotFound:
                    await _loggerService.Log(LogLevel.Warning, $"Unavailable resource requested - {vttHandlerResponse.HandlerResponseMessage}", $"URL: {HttpContext.Request.GetDisplayUrl()}");
                    return StatusCode(404, vttHandlerResponse.HandlerResponseMessage);
                case HandlerResponseState.GenericError:
                    await _loggerService.Log(LogLevel.Error, $"{vttHandlerResponse.HandlerResponseMessage} - {ex?.Message}", ex?.ToString() ?? string.Empty);
                    return StatusCode(500, vttHandlerResponse.HandlerResponseMessage);
                default:
                    await _loggerService.Log(LogLevel.Critical, $"Error trying to log error {vttHandlerResponse.HandlerResponseMessage} - {ex?.Message}", ex.ToString());
                    return StatusCode(500, vttHandlerResponse.HandlerResponseMessage);
            }
        }
    }
}
