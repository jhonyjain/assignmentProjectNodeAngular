import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';




import { AddMomentComponent } from './moment/add-moment/add-moment.component';
import { ListMomentComponent } from './moment/list-moment/list-moment.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{path:'',component:SignupComponent}, 
{path:'login',component:LoginComponent}, 
{path:'add-moment/:id',component:AddMomentComponent}, 
{path:'list-moment',component:ListMomentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
