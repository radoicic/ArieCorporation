using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class CountSubRegionsView
{
    public int? Id { get; set; }

    public string Name { get; set; } = null!;

    public string SmallCode { get; set; } = null!;

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public int? ProvinceCount { get; set; }

    public int? DistrictCount { get; set; }

    public int? VillageCount { get; set; }

    public int? SdpCount { get; set; }

    public int RegionType { get; set; }
}
