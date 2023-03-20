using System;
namespace FantasyFishing.Models
{
    public partial class Fish
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public object Img_Src_Set { get; set; }
        public Meta Meta { get; set; }
    }

    public partial class Meta
    {
        //public string Conservation_Status { get; set; }
        public object Scientific_Classification { get; set; }
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
}

