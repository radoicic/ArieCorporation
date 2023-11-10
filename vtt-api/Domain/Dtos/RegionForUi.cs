using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.Domain.Dtos
{
    
    public class RegionForUi : CountSubRegionsView
    {
        public RegionType RegionType { get; set; }
        public string SmallCode { get; set; }
        public short? LookupCountryId { get; set; }
    }
}
