using System;
using System.Collections.Generic;

namespace FantasyFishing.Models;

public partial class CaughtFish
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public string? FishName { get; set; }

    public string? FishImage { get; set; }

    public string? FishFamily { get; set; }

    public string? Species { get; set; }
}
