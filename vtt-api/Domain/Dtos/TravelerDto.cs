using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vtt_Api.Domain.DataAccess;

namespace Vtt_Api.Domain.Dtos
{
    public class TravelerDto
    {
        public int TravelerId { get; set; }

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public string? Address { get; set; }

        public byte? Sex { get; set; }

        public short NationalityCountryId { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public DateTime Dob { get; set; }

        public string Email { get; set; } = string.Empty!;

    }

}
