using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.CommandsAndQueries.Queries
{
    public class GetRegionDetailsQuery : VttRequest<RegionDetailsResult>
    {
        public int? Id { get; set; }
        public RegionType? RegionType { get; set; }
    }
}
