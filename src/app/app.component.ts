import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  x = false
  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService
  ) { }



  logout() {
    this.oidcSecurityService.logoff();
    this.router.navigate(["login"]);
  }

}
