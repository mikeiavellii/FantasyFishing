using System;
using System.Collections.Generic;

namespace FantasyFishing.Models;

public partial class UserInfo
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? GoogleName { get; set; }

    public double? Currency { get; set; }

    public bool? BetterRod { get; set; }

    public bool? CleanWaters { get; set; }

    public bool? FasterReel { get; set; }

    public double? UserLevel { get; set; }
}
