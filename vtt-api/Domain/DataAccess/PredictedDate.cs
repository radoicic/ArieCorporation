using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class PredictedDate
{
    public short PredictedDateId { get; set; }

    public string PredictedDateName { get; set; } = null!;

    public int StartValue { get; set; }

    public int EndValue { get; set; }

    public virtual ICollection<VaccineDose> VaccineDosePredictedDateEnds { get; } = new List<VaccineDose>();

    public virtual ICollection<VaccineDose> VaccineDosePredictedDateStarts { get; } = new List<VaccineDose>();
}
