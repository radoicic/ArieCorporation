using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class ResetPasswordCommand : VttRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Code { get; set; }
    }
}
