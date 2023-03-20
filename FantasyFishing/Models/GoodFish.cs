using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace FantasyFishing.Models
{
    public partial class GoodFish
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public ImgLink Img_Src_Set { get; set; }
        public GoodMeta Meta { get; set; }
    }

    public partial class GoodMeta
    {
        //public string Conservation_Status { get; set; }
        public SciClass Scientific_Classification { get; set; }
        //public string Binomial_Name { get; set; }
        //public string Type_Species { get; set; }
        //public string Synonyms { get; set; }
        //public string Subfamilies_Genera { get; set; }
        //public string Genera { get; set; }
        //public string Families { get; set; }
        //public string Subfamily { get; set; }
        //public string Subfamilies { get; set; }
        //public string Species { get; set; }
    }

    public partial class SciClass
    {
        public string Kingdom { get; set; }
        public string? Phylum { get; set; }
        public string? Class { get; set; }
        public string? Order { get; set; }
        public string? Family { get; set; }
        public string? Genus { get; set; }
        public string? Species { get; set; }
        public string? SubOrder { get; set; }
        public string? SubFamily { get; set; }
        public string? InfraClass { get; set; }
        public string? Clade { get; set; }
    }

    public partial class ImgLink
    {
        [JsonProperty(PropertyName = "1.5x")]
        public string Link1 { get; set; }
        [JsonProperty(PropertyName = "2x")]
        public string Link2 { get; set; }
    }
}

