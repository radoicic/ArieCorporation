using Vtt_Api.CommandAndQueryHandlers.Shared;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.Add)]
    public class DraftFlowRegistrationCommandHandler : AbstractVttRequestHandler<DraftFlowRegistrationCommand, int>
    {
        public readonly VttContext _vttContext;
        public DraftFlowRegistrationCommandHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<int>> Handle(DraftFlowRegistrationCommand request, CancellationToken cancellationToken)
        {
            var isAuthorized = request.VttClaims.UserRegionAssignments.HasSdpAuthorization(request.SdpId, _vttContext);
            if(!isAuthorized)
            {
                return NotAllowed();
            }
            var userId = int.Parse(request.VttClaims.UserId);
            var draft = new FlowRegistrationDraft();
            if (request.DraftId != null)
            {
                draft = _vttContext.FlowRegistrationDrafts.FirstOrDefault(x => x.FlowRegistrationDraftId == request.DraftId);
                if (draft == null)
                {
                    return NotFound();
                }
                if (draft.UserId != userId)
                {
                    return NotAllowed();
                }
            }
            switch (request.FlowRegistrationStep)
            {
                case FlowRegistrationStep.Guardian:
                    draft.SerializedGuardianData = request.SerializedFormData;
                    break;
                case FlowRegistrationStep.Child:
                    draft.SerializedChildData = request.SerializedFormData;
                    break;
                case FlowRegistrationStep.Travel:
                    draft.SerializedTravelerData = request.SerializedFormData;
                    break;
                case FlowRegistrationStep.Vaccine:
                    draft.SerializedVaccineData = request.SerializedFormData;
                    break;
                default: throw new ArgumentException(typeof(FlowRegistrationStep).Name);
            }
            draft.SdpId = request.SdpId;
            draft.UserId = userId;
            draft.LastSavedAtUtc = DateTime.UtcNow;
            if(draft.FlowRegistrationDraftId == 0)
            {
                _vttContext.FlowRegistrationDrafts.Add(draft);
            }
            else
            {
                _vttContext.FlowRegistrationDrafts.Update(draft);
            }
            await _vttContext.SaveChangesAsync(cancellationToken);
            return Success(draft.FlowRegistrationDraftId);
        }
    }
}
