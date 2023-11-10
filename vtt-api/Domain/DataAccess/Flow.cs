using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Flow
{
    public int FlowId { get; set; }

    public int AddedByUserId { get; set; }

    public string ReasonForTravel { get; set; } = null!;

    public short ComingFromCountryId { get; set; }

    public int? ComingFromProvinceId { get; set; }

    public int? ComingFromDistrictId { get; set; }

    public int? ComingFromVillageId { get; set; }

    public short GoingToCountryId { get; set; }

    public int? GoingToProvinceId { get; set; }

    public int? GoingToDistrictId { get; set; }

    public int? GoingToVillageId { get; set; }

    public short ModeOfTransport { get; set; }

    public int SdpId { get; set; }

    public DateTime DateAdded { get; set; }

    public virtual User AddedByUser { get; set; } = null!;

    public virtual Country ComingFromCountry { get; set; } = null!;

    public virtual District? ComingFromDistrict { get; set; }

    public virtual Province? ComingFromProvince { get; set; }

    public virtual Village? ComingFromVillage { get; set; }

    public virtual ICollection<FlowChild> FlowChildren { get; } = new List<FlowChild>();

    public virtual ICollection<FlowTraveler> FlowTravelers { get; } = new List<FlowTraveler>();

    public virtual Country GoingToCountry { get; set; } = null!;

    public virtual District? GoingToDistrict { get; set; }

    public virtual Village? GoingToVillage { get; set; }

    public virtual Sdp Sdp { get; set; } = null!;
}
