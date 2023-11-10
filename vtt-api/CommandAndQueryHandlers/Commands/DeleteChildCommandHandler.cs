using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Children", ModuleAction.Delete)]

    public class DeleteChildCommandHandler : AbstractVttCommandHandler<DeleteChildCommand>
    {
        public readonly VttContext _vttContext;
        private readonly IMapper _mapper;
        public DeleteChildCommandHandler(VttContext vttContext, IMapper mapper)
        {
            _vttContext = vttContext;
            _mapper = mapper;
        }
        public async override Task<VttHandlerResponse> Handle(DeleteChildCommand request, CancellationToken cancellationToken)
        {
            await using var transaction = await _vttContext.Database.BeginTransactionAsync(cancellationToken);
            var child = _vttContext.Children.Where(x => x.ChildId == request.id).Include(e => e.FlowChildren).FirstOrDefault();
            if(child == null)
            {
                return NotFound();
            }

            _vttContext.FlowChildren.RemoveRange(child.FlowChildren);
            _vttContext.Children.Remove(child);

            await _vttContext.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync(cancellationToken);

            return Success();
        }
    }
}
