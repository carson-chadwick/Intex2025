using System;
using System.Collections.Generic;

namespace Intex2025.API.Data;

public partial class UserOverallTopPick
{
    [Key]
    public int? UserId { get; set; }

    public string? Title { get; set; }

    public int? Rank { get; set; }
}
