using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Country
{
    public short CountryId { get; set; }

    public string CountryName { get; set; } = null!;

    public decimal? Lat { get; set; }

    public decimal? Long { get; set; }

    public short LookupCountryId { get; set; }

    public virtual ICollection<Child> Children { get; } = new List<Child>();

    public virtual ICollection<Flow> FlowComingFromCountries { get; } = new List<Flow>();

    public virtual ICollection<Flow> FlowGoingToCountries { get; } = new List<Flow>();

    public virtual LookupCountry LookupCountry { get; set; } = null!;

    public virtual ICollection<Province> Provinces { get; } = new List<Province>();

    public virtual ICollection<Traveler> Travelers { get; } = new List<Traveler>();

    public virtual ICollection<UserRegionAssignment> UserRegionAssignments { get; } = new List<UserRegionAssignment>();
}
