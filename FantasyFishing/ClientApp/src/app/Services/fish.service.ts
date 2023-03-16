import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fish } from '../Models/fish';

@Injectable({
  providedIn: 'root'
})
export class FishService {

  url: string = "api/Fishing";

  constructor(private http: HttpClient, @Inject ('BASE_URL') private baseUrl: string) { }

  getFish(): Observable<Fish[]>{
    return this.http.get<Fish[]>(`${this.baseUrl}${this.url}/Fish`);
  }
}
