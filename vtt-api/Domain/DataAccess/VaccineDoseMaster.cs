using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineDoseMaster
{
    public short VaccineDoseId { get; set; }

    public short VaccineCategoryId { get; set; }

    public string VaccineDoseName { get; set; } = null!;

    public bool IsBirthDose { get; set; }

    public string? Comments { get; set; }

    public virtual ICollection<VaccinationHistory> VaccinationHistories { get; } = new List<VaccinationHistory>();

    public virtual VaccineCategoryMaster VaccineCategory { get; set; } = null!;
}
