using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class FlowTraveler
{
    public long FlowTravelerId { get; set; }

    public int TravelerId { get; set; }

    public int FlowId { get; set; }

    public virtual Flow Flow { get; set; } = null!;

    public virtual Traveler Traveler { get; set; } = null!;
}
