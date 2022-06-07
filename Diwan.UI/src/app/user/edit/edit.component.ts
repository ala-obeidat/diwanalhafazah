import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../userDto';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  user!: UserDto;
  form!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId'];
    this.userService.find(this.id).subscribe((data: UserDto)=>{
      this.user = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', Validators.required),
      age:new FormControl(),
      level:new FormControl(0),
      gender:new FormControl(0),
      currentPage:new FormControl(0)
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.userService.update(this.id, this.form.value).subscribe((res:any) => {
        console.log('User updated successfully!');
        this.router.navigateByUrl('user/index');
    })
  }

}
