using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class RoleModuleAccess
{
    public int RoleModuleAccessId { get; set; }

    public short RoleId { get; set; }

    public short ModuleId { get; set; }

    public bool View { get; set; }

    public bool Add { get; set; }

    public bool Edit { get; set; }

    public bool Delete { get; set; }

    public virtual Module Module { get; set; } = null!;

    public virtual Role Role { get; set; } = null!;
}
