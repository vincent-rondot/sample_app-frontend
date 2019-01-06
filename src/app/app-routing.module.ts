import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import {
  AuthGuardService as AuthGuard
} from './guard/auth-guard.service';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { Dashboard3Component } from './components/dashboard3/dashboard3.component';
import { RawsummaryComponent } from './components/rawsummary/rawsummary.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login#', component: LoginComponent },

  {
    // path: '', canActivate: [AuthGuard], children: [
    path: '', canActivate: [], children: [
      { path: 'user', component: UserComponent },
      { path: 'dashboard2', component: Dashboard2Component },
      { path: 'dashboard3', component: Dashboard3Component },
      { path: 'rawsummary', component: RawsummaryComponent },
    ]
  }



  // { path: '', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
