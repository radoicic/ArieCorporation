using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Unit
{
    public short UnitId { get; set; }

    public string UnitName { get; set; } = null!;

    public virtual ICollection<VaccineManufacturer> VaccineManufacturers { get; } = new List<VaccineManufacturer>();
}
