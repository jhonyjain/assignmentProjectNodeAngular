import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {MomentService} from '../../services/moment.service'

@Component({
  selector: 'app-list-moment',
  templateUrl: './list-moment.component.html',
  styleUrls: ['./list-moment.component.css']
})
export class ListMomentComponent implements OnInit {

  imageUrl:string ="http://localhost:3000/uploads/"
  searchByName="";
  page = 1;
  count=0;
  tableSize =3;
  showUpdateMsg=false
  formData:any;
  // tableSizes = [3, 6, 9, 12];
  CommentList:any = [];
  showDeleteMsg = false;
 
  constructor(private MomentService:MomentService,public router: Router) { }

  ngOnInit(): void {
    this.getMomentList();
  }

  logout() {
    this.MomentService.logout().subscribe((res:any) => {
      if (res.status) {
        setTimeout(()=>{
          this.router.navigate(['logout']);
        },2000)
      }
    })
  }
  getMomentList(){
    this.MomentService.getMoments().subscribe((data:any)=>{
      this.CommentList = data.result;
      
      console.log(this.CommentList);
    })
  }

  

}
