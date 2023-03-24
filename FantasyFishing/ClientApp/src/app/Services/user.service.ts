import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string = "api/Fishing";
  
  constructor(private http: HttpClient, @Inject ('BASE_URL') private baseUrl: string) { }

  getUser(): Observable <User[]>{
    return this.http.get<User[]>(`${this.baseUrl}${this.url}/GetUser`);
  }
  
  addUser(username:string,googlename:string): Observable <User>{
    return this.http.post<User> (`${this.baseUrl}${this.url}/AddUser?username=${username}&googlename=${googlename}`,{})
  }
  
}
