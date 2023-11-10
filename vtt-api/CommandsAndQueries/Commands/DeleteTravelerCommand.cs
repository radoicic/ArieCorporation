using Vtt_Api.CommandAndQueryProtocol;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class DeleteVaccineCommand : VttRequest
    {
        public short VaccineCategoryId { get; set; }

    }
}
