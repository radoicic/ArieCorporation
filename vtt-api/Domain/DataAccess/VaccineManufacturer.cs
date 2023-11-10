using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineManufacturer
{
    public int VaccineManufacturerId { get; set; }

    public short VaccineCategoryId { get; set; }

    public string ManufacturerName { get; set; } = null!;

    public string Lot { get; set; } = null!;

    public int Quantity { get; set; }

    public DateTime Expiration { get; set; }

    public DateTime Visedition { get; set; }

    public decimal Dose { get; set; }

    public short UnitId { get; set; }

    public decimal? RefillDose { get; set; }

    public virtual Unit Unit { get; set; } = null!;

    public virtual VaccineCategory VaccineCategory { get; set; } = null!;
}
