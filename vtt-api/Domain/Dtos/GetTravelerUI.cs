using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vtt_Api.Domain.Dtos
{
    public class GetTravelerUI
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public string? Address { get; set; }

        public byte? Sex { get; set; }

        public int Nationality { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public string Dob { get; set; }

        public string Email { get; set; } = null!;
    }
}
