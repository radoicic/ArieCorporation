using MediatR;
using Vtt_Api.CommandAndQueryProtocol.Models;

namespace Vtt_Api.CommandAndQueryProtocol
{
    public abstract class AbstractVttCommandHandler<TRequest> : VttHandler, IRequestHandler<TRequest, VttHandlerResponse>
        where TRequest : IRequest<VttHandlerResponse>
    {
        public abstract Task<VttHandlerResponse> Handle(TRequest request, CancellationToken cancellationToken);
    }
}
