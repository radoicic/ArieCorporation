using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Traveler
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

    public string Email { get; set; } = null!;

    public virtual ICollection<FlowTraveler> FlowTravelers { get; } = new List<FlowTraveler>();

    public virtual Country NationalityCountry { get; set; } = null!;
}
