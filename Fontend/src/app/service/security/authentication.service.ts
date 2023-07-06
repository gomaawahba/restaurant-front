import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }
  executeAuthentication(email:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}signin`,{email,password}).pipe(
      map(

        response=>{
          sessionStorage.setItem("email",response.email)

          sessionStorage.setItem("token",`Bearer ${response.token}`)
          return response;
        }

      )
    )
  }
  createUser(email:string,password:string):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}signup`,{email,password}).pipe(
      map(
        response=>{
          return response;
        }
      )
    )
  }
 getAuthentication(){
    return sessionStorage.getItem("email")

 }


  getToken(){
    if(this.getAuthentication()){
      return sessionStorage.getItem('token')
    }
    return ;
 };
}
