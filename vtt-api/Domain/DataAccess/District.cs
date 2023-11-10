using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class District
{
    public int DistrictId { get; set; }

    public int ProvinceId { get; set; }

    public string DistrictName { get; set; } = null!;

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public virtual ICollection<Flow> FlowComingFromDistricts { get; } = new List<Flow>();

    public virtual ICollection<Flow> FlowGoingToDistricts { get; } = new List<Flow>();

    public virtual Province Province { get; set; } = null!;

    public virtual ICollection<UserRegionAssignment> UserRegionAssignments { get; } = new List<UserRegionAssignment>();

    public virtual ICollection<Village> Villages { get; } = new List<Village>();
}
