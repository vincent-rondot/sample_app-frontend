import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import { 
  AuthGuardService as AuthGuard 
} from './guard/auth-guard.service';

const routes: Routes = [
  { path: 'user', component: UserComponent,   canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
