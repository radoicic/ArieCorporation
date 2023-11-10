using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class UserSecondary
{
    public int UserSecondaryId { get; set; }

    public int? FlowRecordSdpId { get; set; }

    public virtual Sdp? FlowRecordSdp { get; set; }

    public virtual ICollection<User> Users { get; } = new List<User>();
}
