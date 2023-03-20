export interface Fish {
    id: number;
    name: string;
    url: string;
    img_Src_Set: ImgLink;
    meta: MetaData;
}

export interface MetaData {
    
    scientific_Classification: SciClass;
    binomial_Name: string;
    type_Species: string;
    synonyms: string;
    subFamilies_Genera: string;
    genera: string;
    familes: string;
    subfamily: string;
    subfamilies: string;
    species: string;
}

export interface ImgLink {
    link1: string;
    link2: string;
}

export interface SciClass{
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
    subOrder: string;
    subFamily: string;
    infraClass: string;
    clade: string;
}
