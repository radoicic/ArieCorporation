using MediatR;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;

namespace Vtt_Api.CommandAndQueryProtocol
{
    public abstract class AbstractVttRequestHandler<TRequest, TResponseData> : VttHandler<TResponseData>, IRequestHandler<TRequest, VttHandlerResponse<TResponseData>>
        where TRequest : IRequest<VttHandlerResponse<TResponseData>>
    {
        public abstract Task<VttHandlerResponse<TResponseData>> Handle(TRequest request, CancellationToken cancellationToken);
    }
}
