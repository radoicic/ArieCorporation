using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.CommandAndQueryProtocol.Models;
using Vtt_Api.CommandsAndQueries.Commands;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Services.Interface;

namespace Vtt_Api.CommandAndQueryHandlers.Commands
{
    public class ResetPasswordCommandHandler : AbstractVttCommandHandler<ResetPasswordCommand>
    {
        private readonly VttContext _context;
        private readonly ICryptoService _cryptoService;
        public ResetPasswordCommandHandler(VttContext context, ICryptoService cryptoService)
        {
            _context = context;
            _cryptoService = cryptoService;
        }

        public async override Task<VttHandlerResponse> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = (from userRow in _context.Users
                        where userRow.Email == request.Email
                        select userRow).FirstOrDefault();
            if (user == null)
            {
                return Challenge("User not found");
            }
            if (!_cryptoService.Verify(request.Code, user.PasswordResetCodeHash))
            {
                return Challenge("Wrong Code");
            }
            user.PasswordHash = _cryptoService.Hash(request.Password);
            user.PasswordResetCodeHash = null;// clear after single use
            await _context.SaveChangesAsync(cancellationToken);
            return Success();
            
        }
    }
}
