using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Village
{
    public int VillageId { get; set; }

    public int DistrictId { get; set; }

    public string VillageName { get; set; } = null!;

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public virtual District District { get; set; } = null!;

    public virtual ICollection<Flow> FlowComingFromVillages { get; } = new List<Flow>();

    public virtual ICollection<Flow> FlowGoingToVillages { get; } = new List<Flow>();

    public virtual ICollection<Sdp> Sdps { get; } = new List<Sdp>();

    public virtual ICollection<UserRegionAssignment> UserRegionAssignments { get; } = new List<UserRegionAssignment>();
}
