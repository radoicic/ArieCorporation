using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Middleware.Logging
{
    public class LoggingBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IRequestHandler<TRequest, TResponse> _requestHandler;
        private readonly ILoggerService _loggerService;
        public LoggingBehaviour(IRequestHandler<TRequest, TResponse> requestHandler, ILoggerService loggerService)
        {
            _requestHandler = requestHandler;
            _loggerService = loggerService;
        }
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var handlerName = _requestHandler.GetType().Name;
            var requestJson = SanitizeAndPrepareJson(request);
            await _loggerService.Log(LogLevel.Information, $"Handler called: {handlerName}", requestJson);
            return await next();
        }

        private static string SanitizeAndPrepareJson(TRequest request)
        {
            LoginCommand? loginCommand = request as LoginCommand;
            if(loginCommand == null)
            {
                return JsonConvert.SerializeObject(request);
            }
            var temp = loginCommand.Password;
            loginCommand.Password = "";
            var jsonString = JsonConvert.SerializeObject(loginCommand);
            loginCommand.Password = temp;
            return jsonString;
        }
    }
}
