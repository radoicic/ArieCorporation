using MediatR;
using Microsoft.AspNetCore.Http;
using System.Reflection;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.Middleware.Authorization
{
    public class AuthorizationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
        where TResponse :  class
    {
        private readonly IRequestHandler<TRequest, TResponse> _requestHandler;
        private readonly IClaimsService _claimsService;
        public AuthorizationBehavior(IRequestHandler<TRequest, TResponse> requestHandler, IClaimsService claimsService)
        {
            _requestHandler = requestHandler;
            _claimsService = claimsService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var handlerAttributes = _requestHandler.GetType().GetCustomAttributes<AuthorizeVttHandlerAttribute>();
            if (!handlerAttributes.Any())
            {
                return await next();
            }
            var claims = _claimsService.GetClaims();
            if (claims == null || !claims.Any())
            {
                return PrepareMethod<TResponse>("Challenge").Invoke(null, new string[] { "Not authenticated" }) as TResponse;
            }
            var vttClaims = _claimsService.PrepareVttClaims(claims);
            if (!vttClaims.UserModuleAccessViews.Any())
            {
                return PrepareMethod<TResponse>("NotAllowed").Invoke(null, new string[] { "Access Denied" }) as TResponse;
            }
            var prop = request.GetType().GetProperty("VttClaims", BindingFlags.Public | BindingFlags.Instance);
            if(prop != null && prop.CanWrite)
            {
                prop.SetValue(request, vttClaims, null);
            }
            if(handlerAttributes.Count() == 1 && string.IsNullOrEmpty(handlerAttributes.First().Module)) // all authenticated users
            {
                return await next();
            }
            foreach(var attribute in handlerAttributes)
            {
                var hasAccessToAllActions = true;
                foreach(var action in attribute.Actions)
                {
                    var moduleClaims = vttClaims.UserModuleAccessViews.Where(x => x.ModuleName == attribute.Module).ToList();
                    switch(action)
                    {
                        case ModuleAction.View:
                            hasAccessToAllActions = moduleClaims.Any(x => x.View);
                            break;
                        case ModuleAction.Add:
                            hasAccessToAllActions = moduleClaims.Any(x => x.Add);
                            break;
                        case ModuleAction.Edit:
                            hasAccessToAllActions = moduleClaims.Any(x => x.Edit);
                            break;
                        case ModuleAction.Delete:
                            hasAccessToAllActions = moduleClaims.Any(x => x.Delete);
                            break;
                    }
                    if(!hasAccessToAllActions) 
                    {
                        break;
                    }
                }
                if(hasAccessToAllActions)
                {
                    return await next();
                }
            }
            return PrepareMethod<TResponse>("NotAllowed").Invoke(null, new string[] { "Access Denied" }) as TResponse;
        }
        private static MethodInfo PrepareMethod<TResponse>(string methodName)
        {
            var genericArgs = typeof(TResponse).GetGenericArguments();
            if (genericArgs.Any())
            {
                var TResponseData = genericArgs.First();
                var vttHandlerType = typeof(VttHandler<>);
                var vtthandler = vttHandlerType.MakeGenericType(TResponseData);
                return vtthandler.GetMethod(methodName);
            }
            else
            {
                var vttHandlerType = typeof(VttHandler);
                return vttHandlerType.GetMethod(methodName);
            }
        }
    }
}