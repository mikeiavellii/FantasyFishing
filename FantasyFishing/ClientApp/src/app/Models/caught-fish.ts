import { ImgLink, SciClass } from "./fish";

export interface CaughtFish {
    id?: number;
    userId: string;
    fishName: string;
    imageLink: ImgLink;
    scientificClass: SciClass;
    fishImage: string;
}
