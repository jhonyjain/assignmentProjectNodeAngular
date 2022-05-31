import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData:any;
  showMessage = false;
  submitted = false;
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    Password:new FormControl('', [Validators.required]),
  });

  constructor(public router: Router,private LoginService :LoginService) {}
  ngOnInit(): void {
    this.formData = this.loginForm.controls
  }



 
  onSubmit() {
    console.log("this.loginForm.value");
    console.log(this.loginForm.value);
   
    this.submitted =true;

  
    this.LoginService.login(this.loginForm.value).subscribe((res:any) => {

      if (res.status) {
        this.showMessage = true
        setTimeout(()=>{
          this.showMessage = false;
          this.router.navigate(['add-moment/'+res.result._id]);
        },3000)
      }
    })
  }


}
