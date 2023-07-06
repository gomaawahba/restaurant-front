import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBaseAuthService implements HttpInterceptor{


  constructor(private auth:AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //alert("intercept ok")
    if(this.auth.getAuthentication() && this.auth.getToken()){

      req=req.clone(
        {
          setHeaders:{
            // @ts-ignore
            Autorization: this.auth.getToken()
          }
        }
      )
      //alert("ok")

    }
    return next.handle(req);
  }
}
