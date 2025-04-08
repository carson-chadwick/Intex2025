using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Intex2025.API.Data;

public partial class CollabRec
{
    public string? ShowId { get; set; }

    public string? RecId { get; set; }

    public int? Rank { get; set; }
}
