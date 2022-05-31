import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient ) { }
  

  signup( data:any){
    let url = environment.SIGNUP_BASE_URL;
    console.log(url)
    const formdata= new FormData();
    formdata.append("file","null");
    formdata.append("full_name",data.full_name);
    formdata.append("email",data.email);
    formdata.append("password",data.Password);
    return this.httpClient.post(url, formdata).pipe(
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

