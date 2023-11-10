using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class UserRegionAssignment
{
    public int UserRegionAssignmentId { get; set; }

    public int UserId { get; set; }

    public short CountryId { get; set; }

    public int? ProvinceId { get; set; }

    public int? DistrictId { get; set; }

    public int? VillageId { get; set; }

    public int? SdpId { get; set; }

    public virtual Country Country { get; set; } = null!;

    public virtual District? District { get; set; }

    public virtual Province? Province { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Village? Village { get; set; }
}
