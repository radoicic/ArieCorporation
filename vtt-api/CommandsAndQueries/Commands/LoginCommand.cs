using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class LoginCommand : VttRequest<SessionForUi>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Otp { get; set; }
    }
}