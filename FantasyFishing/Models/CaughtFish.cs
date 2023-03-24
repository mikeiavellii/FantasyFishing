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

    public string? FishClass { get; set; }

    public string? FishOrder { get; set; }

    public string? Genus { get; set; }
}
