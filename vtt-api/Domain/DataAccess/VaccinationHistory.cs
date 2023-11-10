using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccinationHistory
{
    public int VaccinationHistoryId { get; set; }

    public short VaccineDoseId { get; set; }

    public int ChildId { get; set; }

    public DateTime? VaccinationDateTime { get; set; }

    public virtual Child Child { get; set; } = null!;

    public virtual VaccineDose VaccineDose { get; set; } = null!;
}
