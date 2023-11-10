using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Province
{
    public int ProvinceId { get; set; }

    public short CountryId { get; set; }

    public string ProvinceName { get; set; } = null!;

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public virtual Country Country { get; set; } = null!;

    public virtual ICollection<District> Districts { get; } = new List<District>();

    public virtual ICollection<Flow> Flows { get; } = new List<Flow>();

    public virtual ICollection<UserRegionAssignment> UserRegionAssignments { get; } = new List<UserRegionAssignment>();
}
