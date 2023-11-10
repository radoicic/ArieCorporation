using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class SetSdpContextCommand : VttRequest
    {
        public int SdpId { get; set; }
    }
}
