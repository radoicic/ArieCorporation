using Vtt_Api.Domain.DataAccess;

namespace Vtt_Api.Domain.Dtos
{
    public class VaccineDto
    {
        public short VaccineCategoryId { get; set; }

        public string? VaccineCategoryName { get; set; }

        public List<VaccineManufacturerDto> VaccineManufacturerData { get; set; }
        public List<VaccineDoseDto> VaccineDoseData { get; set; }

    }

    public class VaccineManufacturerDto
    {
        public int? VaccineManufacturerId { get; set; }

        public string ManufacturerName { get; set; } = null!;

        public bool IsBirthDose { get; set; }

        public string Comments { get; set; } = null!;

        public string Lot { get; set; } = null!;

        public int Quantity { get; set; }
        public DateTime Expiration { get; set; }

        public DateTime Visedition { get; set; }

        public decimal Dose { get; set; }

        public string? Unit { get; set; }
        public short UnitId { get; set; }

        public decimal? RefillDose { get; set; }
    }

    public class VaccineDoseDto
    {
        public int? VaccineDoseId { get; set; }
        public string VaccineDoseName { get; set; }
        public byte DoseNo { get; set; }
        public short PredictedStartDateId { get; set; }
        public string? PredictedStartDate { get; set; }
        public short PredictedEndDateId { get; set; }
        public string? PredictedEndDate { get; set; }

    }

    public class VaccineFormOptions
    {
        public List<PredictedDateOption> PredictedDateOptions { get; set; }
        public List<UnitOption> UnitOptions { get; set; }
    }

    public class PredictedDateOption
    {
        public int PredictedDateId { get; set; }
        public string PredictedDateName { get; set; }
    }

    public class UnitOption
    {
        public int UnitId { get; set; }
        public string UnitName { get; set; }
    }
}
