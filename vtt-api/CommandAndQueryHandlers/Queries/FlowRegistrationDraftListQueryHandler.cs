using Microsoft.EntityFrameworkCore;
using Vtt_Api.CommandAndQueryHandlers.Shared;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.Add)]
    public class FlowRegistrationDraftListQueryHandler : AbstractVttRequestHandler<FlowRegistrationDraftListQuery, List<DraftForUi>>
    {
        public readonly VttContext _vttContext;
        public FlowRegistrationDraftListQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<List<DraftForUi>>> Handle(FlowRegistrationDraftListQuery request, CancellationToken cancellationToken)
        {
            if (!request.VttClaims.UserRegionAssignments.HasSdpAuthorization(request.SdpId, _vttContext))
            {
                return NotAllowed();
            }
            var query = (from draft in _vttContext.FlowRegistrationDrafts
                         join sdp in _vttContext.Sdps on draft.SdpId equals sdp.SdpId
                         where draft.UserId == int.Parse(request.VttClaims.UserId) && draft.SdpId == request.SdpId
                         select new DraftForUi()
                         {
                             SdpId = sdp.SdpId,
                             SdpName = sdp.SdpName,
                             DraftId = draft.FlowRegistrationDraftId,
                             LastSavedAtUtc = draft.LastSavedAtUtc
                         });
            var drafts = await query.ToListAsync(cancellationToken);
            return Success(drafts);
        }
    }
}
