using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class DeleteTravelerCommand : VttRequest
    {
        public int id { get; set; }
    }
}
