using Vtt_Api.CommandAndQueryProtocol;
using Vtt_Api.Domain.DataAccess;
using Vtt_Api.Domain.Dtos;

namespace Vtt_Api.CommandsAndQueries.Commands
{
    public class UpdateChildCommand : VttRequest<Child>
    {
        public int ChildId { get; set; }

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public DateTime Dob { get; set; }

        public byte Sex { get; set; }

        public string? Address { get; set; }

        public short NationalityCountryId { get; set; }

        public string? Avatar { get; set; } = null!;

    }
}
