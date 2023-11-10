using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class AddTravelerCommand : VttRequest<TravelerDto>
    {
        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public string? Address { get; set; }

        public byte? Sex { get; set; }

        public short NationalityCountryId { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public DateTime Dob { get; set; }

        public string Email { get; set; } = null!;

    }
}
