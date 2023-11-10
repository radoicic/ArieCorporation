using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class AddRegionCommand : VttRequest<RegionForUi>
    {
        public string Name { get; set; }
        public decimal? Lat { get; set; }
        public decimal? Long { get; set; }
        public RegionType RegionType { get; set; }
        public int? ParentId { get; set; }
        public short? LookupCountryId { get; set; }
    }
}
