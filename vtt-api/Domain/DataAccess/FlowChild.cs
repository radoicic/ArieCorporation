using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class FlowChild
{
    public long FlowChildId { get; set; }

    public int FlowId { get; set; }

    public int ChildId { get; set; }

    public virtual Child Child { get; set; } = null!;

    public virtual Flow Flow { get; set; } = null!;
}
