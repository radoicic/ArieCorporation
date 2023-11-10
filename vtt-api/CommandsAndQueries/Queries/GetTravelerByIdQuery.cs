using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class GetTravelerByIdQuery : VttRequest<GetTravelerUI>
    {
        public int id { get; set; }
    }
}
