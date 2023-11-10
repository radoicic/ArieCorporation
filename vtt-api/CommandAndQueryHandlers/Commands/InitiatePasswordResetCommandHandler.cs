using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    public class InitiatePasswordResetCommandHandler : AbstractVttCommandHandler<InitiatePasswordResetCommand>
    {
        private readonly VttContext _context;
        private readonly ICryptoService _cryptoService;
        private readonly IMessagingService _messagingService;
        public InitiatePasswordResetCommandHandler(VttContext vttContext, ICryptoService cryptoService, IMessagingService messagingService)
        {
            _context = vttContext;
            _cryptoService = cryptoService;
            _messagingService = messagingService;
        }

        public override async Task<VttHandlerResponse> Handle(InitiatePasswordResetCommand request, CancellationToken cancellationToken) 
        {
            VttHandlerResponse<string> handlerResponse = new();
            
            var user = (from userRow in _context.Users
                        where userRow.Email == request.Email
                        select userRow).FirstOrDefault();
            if (user == null)
            {
                return Challenge("User not found");
            }
            var code = _cryptoService.GeneratePassword();
            user.PasswordResetCodeHash = _cryptoService.Hash(code);
            await _context.SaveChangesAsync(cancellationToken);
            _messagingService.SendEmail(new[] { user.Email },
                Array.Empty<string>(),
                Array.Empty<string>(),
                "Password Reset Code",
                code);
            return Success(); // Do not send code back to client!
        }
    }
}
