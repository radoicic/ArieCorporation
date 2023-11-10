using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineDose
{
    public short VaccineDoseId { get; set; }

    public short VaccineCategoryId { get; set; }

    public string VaccineDoseName { get; set; } = null!;

    public string? Comments { get; set; }

    public short PredictedDateStartId { get; set; }

    public short PredictedDateEndId { get; set; }

    public byte DoseNo { get; set; }

    public virtual PredictedDate PredictedDateEnd { get; set; } = null!;

    public virtual PredictedDate PredictedDateStart { get; set; } = null!;

    public virtual ICollection<VaccinationHistory> VaccinationHistories { get; } = new List<VaccinationHistory>();

    public virtual VaccineCategory VaccineCategory { get; set; } = null!;
}
