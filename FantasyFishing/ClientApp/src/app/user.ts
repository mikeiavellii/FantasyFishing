import { CurrencyPipe } from "@angular/common";

export interface User {
    id: number;
    username: string;
    googlename:string;
    currency: number | CurrencyPipe;
    betterod: boolean;
    cleanwaters: boolean;
    fasterreel: boolean;
    userlevel: number;
}
