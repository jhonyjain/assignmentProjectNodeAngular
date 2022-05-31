import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient ) { }
  

  login(data:any){
    let url = environment.LOGIN_BASE_URL;
    const formdata= new FormData();
    formdata.append("email",data.email);
    formdata.append("password",data.Password);
    return this.httpClient.post(url, formdata)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  logout(){
    let url = environment.LOGOUT_BASE_URL;
    const formdata= new FormData();
    return this.httpClient.post(url,formdata)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

 
  


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

