import { Component, OnInit } from '@angular/core';
import { UserDto } from '../user/userDto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { DashResponse } from './DashResponse';
import { SystemService } from '../systeam.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminLogin = new FormGroup({
    username : new FormControl(null,[Validators.required,Validators.email]),
    password : new FormControl(null,[Validators.required,Validators.minLength(6)])
  })

  Userlogin = new FormGroup({
    mobile : new FormControl(null,[Validators.required]),
  })

  UserloginMobile = new FormGroup({
    userList : new FormControl(null,[Validators.required]),
  })

  constructor(private userService: UserService, private systemService:SystemService, private router: Router) { }
  dash!:DashResponse
  public model!: UserDto;
  public isLogin: boolean = false;
  isLoginMode = true;
  isUserLogin = true
  isUserList = false
  userList:any[]=[]
  mobile:string=''
  error = new BehaviorSubject('')
  form!: FormGroup;
  
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', Validators.required),
      age:new FormControl(),
      level:new FormControl(0),
      gender:new FormControl(0),
    });
    this.systemService.dash().subscribe(res=>{
      this.dash=res
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
    this.error.next('')
  }
  onSwitchUser(){
  this.isUserLogin = !this.isUserLogin
  this.error.next('')
  }

  onSubmit(form: FormGroup){
    this.userService.login(form.value).subscribe((res)=>{
      // if is Admin
      console.log('Login Id',res.id)
      if(res.id == -1){
        this.userService.saveUserData(res.id)
        this.router.navigate(['user/index']);
      }
    }, (err)=>{
      this.error.next("خطأ في اسم المستخدم أو كلمة مرور");
    });
  }

  userlogin(form:FormGroup){
    // if is user
    this.mobile = form.value.mobile
    this.userService.userLogin(this.mobile).subscribe((res)=>{
      this.userList.push(res)
      if(this.userList[0].length > 1){
        this.isUserList = true
      }else if(this.userList.length == 1){
        this.userService.saveUserData(res.id)
        this.router.navigate(['home']);
      }
    }, (err)=>{
      this.error.next("خطأ في رقم الموبايل");
    });
  }

  userLoginMobile(form:FormGroup){
    let name = form.value.userList
    this.userService.userLoginMobile(this.mobile,name).subscribe((res)=>{
      this.userService.saveUserData(res.id)
      this.router.navigate(['home']);
    },(err)=>{
      console.log(err);
    }
    )
  }

  submit(){
    this.userService.create(this.form.value).subscribe((res:any) => {
        console.log('User created successfully!');
        this.onSwitchMode();
    })
  }

  get f(){
    return this.form.controls;
  }

}
