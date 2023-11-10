using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class UserModuleAccessView
{
    public short RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public bool View { get; set; }

    public bool Add { get; set; }

    public bool Edit { get; set; }

    public bool Delete { get; set; }

    public string ModuleName { get; set; } = null!;

    public short ModuleId { get; set; }

    public int UserId { get; set; }
}
