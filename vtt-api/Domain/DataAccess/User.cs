using System;
using System.Collections.Generic;

namespace Vtt_Api.Domain.DataAccess;

public partial class User
{
    public int UserId { get; set; }

    public int? UserSecondaryId { get; set; }

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? OtpHash { get; set; }

    public string? PasswordResetCodeHash { get; set; }

    public virtual ICollection<FlowRegistrationDraft> FlowRegistrationDrafts { get; } = new List<FlowRegistrationDraft>();

    public virtual ICollection<Flow> Flows { get; } = new List<Flow>();

    public virtual ICollection<Log> Logs { get; } = new List<Log>();

    public virtual ICollection<UserRegionAssignment> UserRegionAssignments { get; } = new List<UserRegionAssignment>();

    public virtual ICollection<UserRole> UserRoles { get; } = new List<UserRole>();

    public virtual UserSecondary? UserSecondary { get; set; }
}
