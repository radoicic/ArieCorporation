using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vtt_Api.Domain.Dtos
{
    public class ChildDto
    {
        public int ChildId { get; set; }

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public DateTime Dob { get; set; }

        public byte Sex { get; set; }

        public string? Address { get; set; }

        public short NationalityCountryId { get; set; }

        public string PhotoDataUrl { get; set; } = null!;
    }
}
