import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string = "api/Fishing";
  
  constructor(private http: HttpClient, @Inject ('BASE_URL') private baseUrl: string) { }

  getUserById(id:string): Observable <User>{
    return this.http.get<User>(`${this.baseUrl}${this.url}/UserById?id=${id}`);
  }
  
  addUser(username:string,googlename:string): Observable <User>{
    return this.http.post<User> (`${this.baseUrl}${this.url}/AddUser?username=${username}&googlename=${googlename}`,{})
  }
  
  getAllUsers(): Observable <User[]>{
    return this.http.get<User[]>(`${this.baseUrl}${this.url}/AllUsers`)
  }

  buyBetterRod(userId: string): Observable <User>{
    return this.http.put<User>(`${this.baseUrl}${this.url}/BuyBetterRod?userId=${userId}`, {})
  }
  
  buyCleanWaters(userId: string): Observable <User>{
    return this.http.put<User>(`${this.baseUrl}${this.url}/BuyCleanWaters?userId=${userId}`, {})
  }

  buyFasterReel(userId: string): Observable <User>{
    return this.http.put<User>(`${this.baseUrl}${this.url}/BuyFasterReel?userId=${userId}`, {})
  }
}
