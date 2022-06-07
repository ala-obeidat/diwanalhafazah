import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  id:any;
  constructor(private router :Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('userId')
    if( this.id != 1){
    this.router.navigate(['home'])
    }else {
    this.router.navigate(['user/index'])
    }
  }

}
