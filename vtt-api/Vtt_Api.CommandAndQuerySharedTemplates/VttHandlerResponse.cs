using Vtt_Api.CommandAndQueryProtocol.Enums;

namespace Vtt_Api.CommandAndQueryProtocol.Models
{
    public class VttHandlerResponse
    {
        public VttHandlerResponse() { }
        public VttHandlerResponse(VttHandlerResponse vttHandlerResponse) 
        {
            HandlerResponseState = vttHandlerResponse.HandlerResponseState;
            HandlerResponseMessage = vttHandlerResponse.HandlerResponseMessage;
        }
        public HandlerResponseState HandlerResponseState { get; set; } = HandlerResponseState.GenericError;
        public string HandlerResponseMessage { get; set; } = "Something went wrong";

    }
    public class VttHandlerResponse<TResponseData> : VttHandlerResponse
    {
        public VttHandlerResponse() : base() { }
        public VttHandlerResponse(VttHandlerResponse<TResponseData> vttHandlerResponse) : base(vttHandlerResponse)
        {
            Data = vttHandlerResponse.Data;
        }
        public TResponseData Data { get; set; }
    }
}
