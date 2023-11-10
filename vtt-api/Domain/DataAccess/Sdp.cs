using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Sdp
{
    public int SdpId { get; set; }

    public string SdpName { get; set; } = null!;

    public int VillageId { get; set; }

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public virtual ICollection<FlowRegistrationDraft> FlowRegistrationDrafts { get; } = new List<FlowRegistrationDraft>();

    public virtual ICollection<Flow> Flows { get; } = new List<Flow>();

    public virtual ICollection<UserSecondary> UserSecondaries { get; } = new List<UserSecondary>();

    public virtual Village Village { get; set; } = null!;
}
