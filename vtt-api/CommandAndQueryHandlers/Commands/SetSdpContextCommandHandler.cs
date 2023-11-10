using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryHandlers.Shared;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.Add)]
    public class SetSdpContextCommandHandler : AbstractVttCommandHandler<SetSdpContextCommand>
    {
        public readonly VttContext _vttContext;
        public SetSdpContextCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse> Handle(SetSdpContextCommand request, CancellationToken cancellationToken)
        {
            if(!request.VttClaims.UserRegionAssignments.HasSdpAuthorization(request.SdpId, _vttContext))
            {
                return NotAllowed();
            }
            try
            {
                await _vttContext.Database.BeginTransactionAsync(cancellationToken);
                var user = _vttContext.Users.FirstOrDefault(x => x.UserId == int.Parse(request.VttClaims.UserId));
                var userSecondary = _vttContext.UserSecondaries.FirstOrDefault(x => x.UserSecondaryId == user.UserSecondaryId);
                if (userSecondary == null)
                {
                    userSecondary = new UserSecondary();
                }
                userSecondary.FlowRecordSdpId = request.SdpId;
                user.UserSecondary = userSecondary;
                _vttContext.Update(user);
                await _vttContext.SaveChangesAsync(cancellationToken);
                await _vttContext.Database.CommitTransactionAsync(cancellationToken);
                return Success();
            }
            catch
            {
                _vttContext.Database.RollbackTransaction();
                throw;
            }
        }
    }
}
