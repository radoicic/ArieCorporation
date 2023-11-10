using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineCategory
{
    public short VaccineCategoryId { get; set; }

    public string? VaccineCategoryName { get; set; }

    public virtual ICollection<VaccineDose> VaccineDoses { get; } = new List<VaccineDose>();

    public virtual ICollection<VaccineManufacturer> VaccineManufacturers { get; } = new List<VaccineManufacturer>();
}
