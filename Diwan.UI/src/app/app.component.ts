import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements DoCheck , OnInit {
  title = 'Diwan';
  isAdmin:boolean=true;
  isLogin:boolean=true;
  id:any;
  constructor(private userService: UserService ){}

  ngOnInit(): void {
    this.isAdmin = true
    this.isLogin = true
  }

  ngDoCheck(): void {

    this.id = this.userService.GetUserData()
      if(this.id == -1 ){
        this.isAdmin = false
        this.isLogin = false
      }else {
        this.isAdmin = true
        this.isLogin = true
      }

      if(this.id != null){
        this.isLogin = false
      }else {
        this.isLogin = true
      }
  }

  logOut(){
    this.isAdmin = true
    this.isLogin = true
    this.userService.logOut()
  }
}
