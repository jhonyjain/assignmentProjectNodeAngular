
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import {MomentService} from '../../services/moment.service'

@Component({
  selector: 'app-add-moment',
  templateUrl: './add-moment.component.html',
  styleUrls: ['./add-moment.component.css']
})
export class AddMomentComponent implements OnInit {

  imageURL: any;
  formData:any;
  showMessage = false;
  submitted = false;
  
  momentForm = new FormGroup({
    image:new FormControl(null),
    comment: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
  });

  constructor(public router: Router,private MomentService :MomentService, private actRoute: ActivatedRoute) {}

  ngOnInit() { 
    this.formData = this.momentForm.controls;
  }
  uploadFile(event:Event) {
    console.log("event");
    console.log(event)
    const target = (event.target as HTMLInputElement).files;
   
    if(target){
      
     
      const file =  target[0];
      this.momentForm.patchValue({
        image: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
    
  }
 
  
  onSubmit() {
    console.log(this.momentForm.value);
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log("id");
    console.log(id);
    this.submitted =true;
  
    this.MomentService.add(this.momentForm.value,id).subscribe((res:any) => {
      if (res.status) {
        this.showMessage = true
        setTimeout(()=>{
          this.showMessage = false;
          this.router.navigate(['list-moment']);
        },3000)
      }
    })
  }

}
