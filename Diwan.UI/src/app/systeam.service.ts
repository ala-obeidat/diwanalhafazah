import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import {DashResponse} from './login/DashResponse';
@Injectable({
  providedIn: 'root'
})


export class SystemService {

  constructor(private httpClient: HttpClient , private router:Router) { }
  private apiURL = "https://poc.ertikaz.tech";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  transaction(data:any):Observable<any> {
    return this.httpClient.post(this.apiURL + '/transaction/',JSON.stringify(data),this.httpOptions)
  }
  dash():Observable<DashResponse> {
    return this.httpClient.get<DashResponse>(this.apiURL + '/dash')
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}


