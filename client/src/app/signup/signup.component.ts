import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  userId:any
  imageURL: any;
  formData:any;
  showMessage = false;
  submitted = false;
  
  signupForm = new FormGroup({
    image:new FormControl(null),
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    Password:new FormControl('', [Validators.required]),
    
  });

  constructor(public router: Router,private SignupService :SignupService) {}
  ngOnInit(): void {
    this.formData = this.signupForm.controls
  }

  // uploadFile(event:Event) {
   
  //   const target = (event.target as HTMLInputElement).files;
   
  //   if(target){
     
  //     const file =  target[0];
  //     this.signupForm.patchValue({
  //       image: file
  //     });
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imageURL = reader.result as string;
  //     }
  //     reader.readAsDataURL(file)
  //   }
    
  // }


 
  onSubmit() {
    console.log("this.signupForm.value");
    console.log(this.signupForm.value);
   
    this.submitted =true;

  
    this.SignupService.signup(this.signupForm.value).subscribe((res:any) => {
      console.log(res);
      if (res.status) {
        this.userId = res.result._id;
        this.showMessage = true
        setTimeout(()=>{
          this.showMessage = false;
          this.router.navigate(['login']);
        },3000)
      }
    })
  }


}
