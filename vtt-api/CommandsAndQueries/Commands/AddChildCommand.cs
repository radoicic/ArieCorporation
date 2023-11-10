using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;
 
namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class AddChildCommand : VttRequest<ChildDto>
    {
        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public string? Address { get; set; }

        public byte? Sex { get; set; }

        public short NationalityCountryId { get; set; }

        public DateTime Dob { get; set; }

    }
}
