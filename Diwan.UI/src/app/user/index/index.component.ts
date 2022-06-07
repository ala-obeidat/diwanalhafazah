import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserDto } from '../userDto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  users: UserDto[] = [];
  tableData:UserDto[] = [];
  searchItems={text:'',level:-1,gender:-1};

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public userService: UserService) { }
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.userService.getAll().subscribe((data: UserDto[])=>{
      this.users = data;
      this.tableData=data;

      console.log(this.users);
    })
  }
  /**
   * Write code on Method
   *
   * @return response()
   */

  deletePost(id:number){
    this.userService.delete(id).subscribe(res => {
        this.users = this.users.filter(item => item.id !== id);
        this.tableData=this.users;
        console.log('Post deleted successfully!');
    })
  }
  
  search(query:any){
    let text=query.target.value;
    if(!text)
    {
      text='';
    }
    this.searchItems.text=text.toLowerCase();
    this.applyFilter();
    console.log('search successfully!',text);
  }
  searchGender(query:any){
    const gender=query.target.value;
    this.searchItems.gender=gender;
    this.tableData=this.users;
    this.applyFilter();
    console.log('Gender search successfully!',gender);
  }
  searchLevel(query:any){
    const level=query.target.value;
    this.tableData=this.users;
    this.searchItems.level=level;
    this.applyFilter();
    console.log('Level search successfully!',level);
  }

  applyFilter(){
    this.tableData = this.users.filter(item =>
      {
        return (this.searchItems.text=='' || (item.name.toLowerCase().includes(this.searchItems.text) || item.mobile.toLowerCase().includes(this.searchItems.text)))
        &&
        (this.searchItems.level==-1 || item.level==this.searchItems.level)
        &&
        (this.searchItems.gender==-1 || item.gender==this.searchItems.gender)

      });
  }
}
