using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class SubmitFlowDraftCommand : VttRequest<int>
    {
        public int DraftId { get; set; }
    }
}