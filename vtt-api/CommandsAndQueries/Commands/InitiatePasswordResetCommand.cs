using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class InitiatePasswordResetCommand : VttRequest
    {
        public string Email { get; set; }
    }
}
