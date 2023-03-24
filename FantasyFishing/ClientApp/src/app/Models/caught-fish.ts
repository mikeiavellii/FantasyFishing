import { ImgLink, SciClass } from "./fish";

export interface CaughtFish {
    id?: number;
    userId: string;
    fishName: string;
    imageLink: ImgLink;
    fishImage: string;
    scientificClass: SciClass;
    fishClass: string;
    fishOrder: string;
    fishFamily: string;
    genus: string;
    species: string;
}
