using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Role
{
    public short RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<RoleModuleAccess> RoleModuleAccesses { get; } = new List<RoleModuleAccess>();

    public virtual ICollection<UserRole> UserRoles { get; } = new List<UserRole>();
}
