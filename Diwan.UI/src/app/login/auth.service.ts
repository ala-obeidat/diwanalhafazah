import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient, private route:Router) {}

  SignUp(email:string , password:string){
    return this.http.post(``,{
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  logIn(email:string , password:string){
    return this.http.post(``,{
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

  // logOut(){
  //   localStorage.removeItem("user")
  //   localStorage.setItem("cart","[]")
  //   this.userData.next(null)
  //   this.route.navigate(['/auth'])
  // }


}
