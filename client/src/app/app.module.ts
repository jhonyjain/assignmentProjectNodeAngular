import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AddMomentComponent } from './moment/add-moment/add-moment.component';
import { ListMomentComponent } from './moment/list-moment/list-moment.component';






@NgModule({
  declarations: [
    AppComponent,
    
    
    NotFoundComponentComponent,
         SignupComponent,
         LoginComponent,
         AddMomentComponent,
         ListMomentComponent,
         


   

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS,
    
  //   multi: true
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
