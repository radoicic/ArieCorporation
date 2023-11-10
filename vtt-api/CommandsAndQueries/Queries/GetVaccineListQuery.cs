using MediatR;
using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class GetVaccineListQuery : VttRequest<List<VaccineDto>>
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
    }
}
