using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Module
{
    public short ModuleId { get; set; }

    public string ModuleName { get; set; } = null!;

    public virtual ICollection<RoleModuleAccess> RoleModuleAccesses { get; } = new List<RoleModuleAccess>();
}
