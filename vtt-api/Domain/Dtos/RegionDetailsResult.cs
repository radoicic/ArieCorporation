using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.Domain.Enums;

namespace Vtt_Api.Domain.Dtos
{
    public class RegionDetailsResult
    {
        public RegionForUi? ParentCountry { get; set; }
        public RegionForUi? ParentProvince { get; set; }
        public RegionForUi? ParentDistrict { get; set; }
        public RegionForUi? ParentVillage { get; set; }
        public List<RegionForUi> SubRegions { get; set; }
        public RegionType? RegionType { get; set; }
        public int? Id { get; set; }
    }
}
