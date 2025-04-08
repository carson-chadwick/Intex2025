using System;
using System.Collections.Generic;

namespace Intex2025.API.Data;

public partial class CollabRec
{
    [Key]
    public string? ShowId { get; set; }

    public string? RecId { get; set; }

    public int? Rank { get; set; }
}
