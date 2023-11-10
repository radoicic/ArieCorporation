using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineCategoryMaster
{
    public short VaccineCategoryId { get; set; }

    public string? VaccineCategoryName { get; set; }

    public virtual ICollection<VaccineDoseMaster> VaccineDoseMasters { get; } = new List<VaccineDoseMaster>();
}
