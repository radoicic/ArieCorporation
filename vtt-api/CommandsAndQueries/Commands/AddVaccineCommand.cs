using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class AddVaccineCommand : VttRequest<VaccineDto>
    {
        public short VaccineCategoryId { get; set; }

        public string? VaccineCategoryName { get; set; }

        public List<VaccineManufacturerDto> VaccineManufacturerData { get; set; }
        public List<VaccineDoseDto> VaccineDoseData { get; set; }
    }
}
