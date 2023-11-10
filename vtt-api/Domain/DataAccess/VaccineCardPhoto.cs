using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class VaccineCardPhoto
{
    public int VaccineCardPhotoId { get; set; }

    public int ChildId { get; set; }

    public string PhotoDataUrl { get; set; } = null!;
}
