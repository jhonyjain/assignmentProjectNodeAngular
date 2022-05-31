import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import {environment} from '../../environments/environment.dev'

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor(private httpClient:HttpClient ) { }
  getMoments(){
    let url = environment.MOMENT_LIST_URL;
     return this.httpClient.get(url)
   }

  add(data:any,user_id:any){
    let url = environment.MOMENT_BASE_URL+"/"+user_id;
    const formdata= new FormData();
    formdata.append("file",data.image);
    formdata.append("comment",data.comment);
    formdata.append("tag",data.tag);
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

