using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class DraftFlowRegistrationCommand : VttRequest<int>
    {
        public string SerializedFormData { get; set; }
        public int SdpId { get; set; }
        public int? DraftId { get; set; }
        public FlowRegistrationStep FlowRegistrationStep { get; set; }
    }
}
