using Microsoft.Extensions.Logging;

namespace Vtt_Api.Services.Interface
{
    public interface ILoggerService
    {
        Task Log(LogLevel logLevel, string message, string details);
    }
}
