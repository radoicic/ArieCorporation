using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class LookupCountry
{
    public short LookupCountryId { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string SmallCode { get; set; } = null!;

    public virtual ICollection<Country> Countries { get; } = new List<Country>();
}
