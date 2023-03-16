using System;
namespace FantasyFishing.Models
{
    public partial class Fish
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Uri Url { get; set; }
        public ImgSrcSetUnion ImgSrcSet { get; set; }
        public Meta Meta { get; set; }
    }

    public partial class ImgSrcSetClass
    {
        public Uri The15X { get; set; }
        public Uri The2X { get; set; }
    }

    public partial class Meta
    {
        public string ConservationStatus { get; set; }
        public ScientificClassificationUnion? ScientificClassification { get; set; }
        public string BinomialName { get; set; }
        public string TypeSpecies { get; set; }
        public string Synonyms { get; set; }
        public string SubfamiliesGenera { get; set; }
        public string Genera { get; set; }
        public string Families { get; set; }
        public string Subfamily { get; set; }
        public string Subfamilies { get; set; }
        public string Species { get; set; }
    }

    public partial class ScientificClassificationClass
    {
        public Kingdom Kingdom { get; set; }
        public Phylum Phylum { get; set; }
        public Class? Class { get; set; }
        public string Order { get; set; }
        public string Family { get; set; }
        public string Genus { get; set; }
        public string Species { get; set; }
        public string Superfamily { get; set; }
        public string Subgenus { get; set; }
        public string Suborder { get; set; }
        public string Clade { get; set; }
        public Unranked? Unranked { get; set; }
        public string Subfamily { get; set; }
        public string Subclass { get; set; }
        public string Infraclass { get; set; }
        public Superorder? Superorder { get; set; }
        public string Tribe { get; set; }
        public string Infraphylum { get; set; }
        public string Superclass { get; set; }
    }

    public enum ImgSrcSetEnum { NotAvailable };

    public enum Class { Actinopterygii, Chondrichthyes, Hyperoartia, Myxini };

    public enum Kingdom { Animalia };

    public enum Phylum { Chordata };

    public enum Superorder { Acanthopterygii, Alepocephali, Batoidea, Elopomorpha, Lepidogalaxii, Paracanthopterygii, Selachimorpha };

    public enum Unranked { Atherinomorpha, Otophysi, Ovalentaria };

    public partial struct ImgSrcSetUnion
    {
        public ImgSrcSetEnum? Enum;
        public ImgSrcSetClass ImgSrcSetClass;

        public static implicit operator ImgSrcSetUnion(ImgSrcSetEnum Enum) => new ImgSrcSetUnion { Enum = Enum };
        public static implicit operator ImgSrcSetUnion(ImgSrcSetClass ImgSrcSetClass) => new ImgSrcSetUnion { ImgSrcSetClass = ImgSrcSetClass };
    }

    public partial struct ScientificClassificationUnion
    {
        public ScientificClassificationClass ScientificClassificationClass;
        public string String;

        public static implicit operator ScientificClassificationUnion(ScientificClassificationClass ScientificClassificationClass) => new ScientificClassificationUnion { ScientificClassificationClass = ScientificClassificationClass };
        public static implicit operator ScientificClassificationUnion(string String) => new ScientificClassificationUnion { String = String };
    }
}

