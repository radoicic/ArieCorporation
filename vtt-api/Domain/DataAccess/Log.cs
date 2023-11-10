using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class Log
{
    public long LogId { get; set; }

    public DateTime Timestamp { get; set; }

    public byte LogLevel { get; set; }

    public string Message { get; set; } = null!;

    public string? Details { get; set; }

    public int? LoggedInUserId { get; set; }

    public virtual User? LoggedInUser { get; set; }
}
