using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class UserRole
{
    public int UserRoleId { get; set; }

    public int UserId { get; set; }

    public short RoleId { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
