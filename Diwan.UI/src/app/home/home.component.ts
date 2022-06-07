import { BookData } from './BookData';
import { SystemService } from './../systeam.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component,ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/userDto';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService , private SystemService:SystemService,public dialog: MatDialog) { }
  saveText:string="حفظ";
  id: any;
  user!: UserDto;
  currentItem:BookData={CurrentPage:1,img:"#",audio:"#"};
  maxPage:number = 604
  currentIndex :number=1
  isClose:boolean = false
  
  bookData:BookData[]=[];

  percentage: any[] = [
    {value: '1', viewValue: '90%'},
    {value: '2', viewValue: '95%'},
    {value: '3', viewValue: '100%'}
  ];

  @ViewChild('save')save: TemplateRef<any> | undefined;
  @ViewChild('Image')Image: TemplateRef<any>| undefined;
  @ViewChild('audioOption') audioPlayerRef: ElementRef| undefined;

onAudioPlay(){
  this.audioPlayerRef?.nativeElement.load();
  this.saveText="حفظ";
}
  transactionForm!:FormGroup;
  ngAfterViewInit():void{
    this.onAudioPlay();
    this.transactionForm= new FormGroup({
      page : new FormControl(1,[Validators.required]),
      percentage: new FormControl(3,[Validators.required,Validators.min(1)])
    })
  }
  ngOnInit(): void {
    
    this.id = this.userService.GetUserData();
    this.getUserData();
  }
  goToPageEvent(event:any){
    const index=parseInt(event.target.value);
    this.goToPage(index);
  }
  goToPage(index:number){
    if(!index || index==0)
      return;
    this.currentIndex=index;
    let item=this.bookData.find(x=>x.CurrentPage==index);
    if(item)
      this.currentItem=item;
    this.onAudioPlay();

  }
  nextPage(){
    if(this.currentIndex>this.maxPage)
      return;
    this.goToPage(this.currentIndex+1);
  }
  prePage(){
    if(this.currentIndex<2)
      return;
    this.goToPage(this.currentIndex-1);
  }
  appendBookingData(currentPage:number){
    for(let i=1;i<=this.maxPage;i++)
    {
      let item:BookData={
        CurrentPage:i,
        img:'',
        audio:''
      };
      
      let audio=i;
      let audioFile=audio.toLocaleString();
      if(audio<10)
        {
          audioFile='00'+audio.toLocaleString()+"_2";
      }
      else if(audio<100)
      {
        audioFile='0'+audio.toLocaleString()+"_2";
      }
      else if(audio<115)
        audioFile=audio.toLocaleString()+"_2";
      else
        audioFile=audio.toLocaleString();
      let image=i+3;
      let imageFile='';
      if(image<10)
        {
          imageFile='000'+image.toLocaleString();
      }
      else if(image<100)
      {
        imageFile='00'+image.toLocaleString();
      }
      else if(image<1000)
      { 
        imageFile='0'+image.toLocaleString();
      }
      item.audio="https://docs.diwanalhafazah.website/voice/Page"+audioFile+".mp3";
      item.img="https://docs.diwanalhafazah.website/pages/"+imageFile+".jpg";;
      if(currentPage==i)
      {
        this.currentItem=item;
        this.currentIndex=i;
      }
      this.bookData.push(item);
    }
  }
  getUserData(){
    this.userService.find(this.id).subscribe((data: UserDto)=>{
      this.user = data;
      this.appendBookingData(this.user.currentPage);
    })
  }

  openDialog() {
    if(this.save)
      this.dialog.open(this.save);
  }
  openImage(){
    if(this.Image)
    this.dialog.open(this.Image);
  }

  submitTransaction(){
    let data = {
      userId : this.id,
      page : this.currentItem.CurrentPage,
      percentage : this.transactionForm.value.percentage,
    }
    this.SystemService.transaction(data).subscribe( (res)=>{
      console.log(res);
      this.isClose = true;
      this.saveText="تم الحفظ";
    }, (err)=>{
      console.log(err);
  })
} 
 
}
