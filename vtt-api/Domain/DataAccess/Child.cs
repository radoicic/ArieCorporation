using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Child
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

    public virtual ICollection<FlowChild> FlowChildren { get; } = new List<FlowChild>();

    public virtual Country NationalityCountry { get; set; } = null!;

    public virtual ICollection<VaccinationHistory> VaccinationHistories { get; } = new List<VaccinationHistory>();
}
