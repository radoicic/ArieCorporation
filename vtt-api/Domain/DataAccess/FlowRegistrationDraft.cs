using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class FlowRegistrationDraft
{
    public int FlowRegistrationDraftId { get; set; }

    public int UserId { get; set; }

    public int SdpId { get; set; }

    public DateTime LastSavedAtUtc { get; set; }

    public string? SerializedGuardianData { get; set; }

    public string? SerializedChildData { get; set; }

    public string? SerializedTravelerData { get; set; }

    public string? SerializedVaccineData { get; set; }

    public virtual Sdp Sdp { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
