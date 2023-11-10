using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryHandlers.Shared;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Enums;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Queries;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;
using Vtt_Api.Middleware.Authorization;

namespace Vtt_Api.CommandAndQueryHandlers.Queries
{
    [AuthorizeVttHandler("Flow Records", ModuleAction.View)]
    public class FlowRegistrationDraftQueryHandler : AbstractVttRequestHandler<FlowRegistrationDraftQuery, string>
    {
        public readonly VttContext _vttContext;
        public FlowRegistrationDraftQueryHandler(VttContext vttContext)
        {
            _vttContext = vttContext;
        }
        public async override Task<VttHandlerResponse<string>> Handle(FlowRegistrationDraftQuery request, CancellationToken cancellationToken)
        {
            var userId = int.Parse(request.VttClaims.UserId);
            if (!request.VttClaims.UserRegionAssignments.HasSdpAuthorization(request.SdpId, _vttContext))
            { 
                return NotAllowed(); 
            }
            var draft = _vttContext.FlowRegistrationDrafts.FirstOrDefault(x => x.FlowRegistrationDraftId == request.DraftId);
            if (draft == null)
            {
                return NotFound();
            }
            if (draft.UserId != userId) 
            { 
                return NotAllowed(); 
            }
            return request.FlowRegistrationStep switch
            {
                FlowRegistrationStep.Guardian => Success(draft.SerializedGuardianData),
                FlowRegistrationStep.Child => Success(draft.SerializedChildData),
                FlowRegistrationStep.Travel => Success(draft.SerializedTravelerData),
                FlowRegistrationStep.Vaccine => Success(draft.SerializedVaccineData),
                _ => throw new ArgumentException(typeof(FlowRegistrationStep).Name),
            };
        }
    }
}
