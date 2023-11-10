using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;

namespace Vtt_Api.CommandAndQueryProtocol
{
    public class VttHandler
    {
        public static VttHandlerResponse PrepareError(string errorMessage = "")
        {
            VttHandlerResponse handlerResponse = new();
            if (!string.IsNullOrEmpty(errorMessage))
            {
                handlerResponse.HandlerResponseMessage = errorMessage;
            }
            return handlerResponse;
        }
        public static VttHandlerResponse Challenge(string errorMessage = "")
        {
            VttHandlerResponse handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.AuthenticationError;
            return handlerResponse;
        }
        public static VttHandlerResponse NotAllowed(string errorMessage = "")
        {
            VttHandlerResponse handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.AuthorizationError;
            return handlerResponse;
        }
        public static VttHandlerResponse NotFound(string errorMessage = "")
        {
            VttHandlerResponse handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.NotFound;
            return handlerResponse;
        }
        public static VttHandlerResponse GenericError(string errorMessage = "")
        {
            VttHandlerResponse handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.GenericError;
            return handlerResponse;
        }
        public static VttHandlerResponse Success(string successMessage = "success")
        {
            return new VttHandlerResponse()
            {
                HandlerResponseMessage = successMessage,
                HandlerResponseState = HandlerResponseState.Success,
            };
        }
    }
    public class VttHandler<TResponseData>
    {
        public static VttHandlerResponse<TResponseData> PrepareError(string errorMessage = "")
        {
            VttHandlerResponse<TResponseData> handlerResponse = new();
            if(!string.IsNullOrEmpty(errorMessage))
            {
                handlerResponse.HandlerResponseMessage = errorMessage;
            }
            return handlerResponse;
        }
        public static VttHandlerResponse<TResponseData> Challenge(string errorMessage = "")
        {
            VttHandlerResponse<TResponseData> handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.AuthenticationError;
            return handlerResponse;
        }
        public static VttHandlerResponse<TResponseData> NotAllowed(string errorMessage = "")
        {
            VttHandlerResponse<TResponseData> handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.AuthorizationError;
            return handlerResponse;
        }
        public static VttHandlerResponse<TResponseData> NotFound(string errorMessage = "")
        {
            VttHandlerResponse<TResponseData> handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.NotFound;
            return handlerResponse;
        }
        public static VttHandlerResponse<TResponseData> GenericError(string errorMessage = "")
        {
            VttHandlerResponse<TResponseData> handlerResponse = PrepareError(errorMessage);
            handlerResponse.HandlerResponseState = HandlerResponseState.GenericError;
            return handlerResponse;
        }
        public static VttHandlerResponse<TResponseData> Success(TResponseData data, string successMessage = "success")
        {
            return new VttHandlerResponse<TResponseData>()
            {
                HandlerResponseMessage = "success",
                HandlerResponseState = HandlerResponseState.Success,
                Data = data
            };
        }
    }
}
