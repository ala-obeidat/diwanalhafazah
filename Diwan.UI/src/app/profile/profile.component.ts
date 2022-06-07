import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/userDto';
import { SystemService } from './../systeam.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService , private SystemService:SystemService) { }
  id: any;
  user!: UserDto;
  isEditMode:boolean=false;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', Validators.required),
    age:new FormControl(),
    level:new FormControl(0),
    gender:new FormControl(0),
    currentPage:new FormControl(0)
  });

  ngOnInit(): void {
    this.id = this.userService.GetUserData()
    this.getUserData()
  }

  getUserData(){
    this.userService.find(this.id).subscribe((data: UserDto)=>{
      this.user = data;
    })
  }

  submit(){
    console.log(this.form.value);
    this.userService.update(this.id, this.form.value).subscribe((res:any) => {
      console.log('User updated successfully!');
    this.isEditMode = false
    })
  }

  editMode(){
    this.isEditMode = true
  }
  editModeOff(){
    this.isEditMode = false
  }




}
