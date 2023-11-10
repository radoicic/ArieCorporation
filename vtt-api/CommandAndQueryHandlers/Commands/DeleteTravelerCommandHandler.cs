using AutoMapper;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Traveler", ModuleAction.Delete)]

    public class DeleteTravelerCommandHandler : AbstractVttCommandHandler<DeleteTravelerCommand>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public DeleteTravelerCommandHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        public async override Task<VttHandlerResponse> Handle(DeleteTravelerCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync(cancellationToken);
            var Traveler = _vttContext.Travelers.FirstOrDefault(x => x.TravelerId == request.id);
            if(Traveler == null)
            {
                return NotFound();
            }

            _vttContext.Travelers.Remove(Traveler);
            await _vttContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return Success();
        }
    }
}
