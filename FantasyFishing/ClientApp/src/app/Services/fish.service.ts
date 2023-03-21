import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaughtFish } from '../Models/caught-fish';
import { Fish } from '../Models/fish';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  url: string = "api/Fishing";

  constructor(private http: HttpClient, @Inject ('BASE_URL') private baseUrl: string) { }

  getFish(): Observable<Fish[]>{
    return this.http.get<Fish[]>(`${this.baseUrl}${this.url}/GetFish`);
  }

  addCaughtFish(newCatch: CaughtFish): Observable<CaughtFish>{
    return this.http.post<CaughtFish>(`${this.baseUrl}${this.url}/AddCaughtFish?userId=${newCatch.userId}&fishName=${newCatch.fishName}&fishImage=${newCatch.imageLink.link1}&fishFamily=${newCatch.scientificClass.family}&species=${newCatch.scientificClass.species}`, {});
  }

  getCaughtFish(userId: string): Observable<CaughtFish[]>{
    return this.http.get<CaughtFish[]>(`${this.baseUrl}${this.url}/GetCaughtFish?userId=${userId}`);
    
  }
  getSingleFish(): Observable<Fish>{
    return this.http.get<Fish>(`${this.baseUrl}${this.url}/GetFish`);
  }
  removeCaughtFish(userId: string, id: number): Observable<CaughtFish>{
    return this.http.delete<CaughtFish>(`${this.baseUrl}${this.url}/DeleteCaughtFish?userId=${userId}&id=${id}`)
  }
}

