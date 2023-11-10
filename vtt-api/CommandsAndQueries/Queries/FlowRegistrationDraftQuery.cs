using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class FlowRegistrationDraftQuery : VttRequest<string>
    {
        public int SdpId { get; set; }
        public FlowRegistrationStep FlowRegistrationStep { get; set; }
        public int? DraftId { get; set; }
    }
}
