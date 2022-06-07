import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from './userDto';
import { UserDetails } from './UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "https://poc.ertikaz.tech";
  // public isAdmin = new BehaviorSubject(false)
  // public isUser = new BehaviorSubject(false)

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient , private router:Router) {}

  getAll(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.apiURL + '/user/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(user:UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.apiURL + '/user/', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id:number): Observable<UserDto> {
    return this.httpClient.get<UserDto>(this.apiURL + '/user/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  detail(id:number): Observable<UserDetails> {
    return this.httpClient.get<UserDetails>(this.apiURL + '/user/details/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, user:UserDto): Observable<UserDto> {
    return this.httpClient.put<UserDto>(this.apiURL + '/user/' + id, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete<UserDto>(this.apiURL + '/user/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //admin
  login(user:UserDto){
    return this.httpClient.post<UserDto>(this.apiURL + '/systemlogin/', JSON.stringify(user) , this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  //user
  userLogin(user:string){
    return this.httpClient.post<UserDto>(this.apiURL + '/login/' + user , this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  userLoginMobile(mobile:string,name:string){
    console.log(mobile + name);
    return this.httpClient.post<UserDto>(this.apiURL + '/loginname/' + mobile + `/${name}` , this.httpOptions)
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

saveUserData(id:any){
  localStorage.setItem("userId",id);
}

GetUserData(){
  return localStorage.getItem("userId");
}

logOut(){
  localStorage.removeItem("userId");
  this.router.navigate(['login']);
}
}
