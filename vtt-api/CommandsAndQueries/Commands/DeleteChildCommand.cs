using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class DeleteChildCommand : VttRequest
    {
        public short id { get; set; }

    }
}
