using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vtt_Api.Domain.Dtos
{
    public class TravelerListUI
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty!;

        public string Age { get; set; }

        public string Sex { get; set; } = string.Empty!;

        public string Nationality { get; set; } = string.Empty!;

        public string? Address { get; set; } = string.Empty!;
        
        public string Phone { get; set; } = string.Empty!;

        public string Avatar { get; set; } = string.Empty!;
        public string Email { get; set; } = string.Empty!;
    }
}
