import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public oidcSecurityService: OidcSecurityService) {
    if (this.oidcSecurityService.moduleSetup) {
      this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
  }


  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   // return !this.jwtHelper.isTokenExpired(token);
  //   return token == '1'; 
  // }


  ngOnInit() {}
 
  ngOnDestroy(): void {}

  login() {

      // if you need to add extra parameters to the login
      // let culture = 'de-CH';
      // this.oidcSecurityService.setCustomRequestParameters({ 'ui_locales': culture });
  
      this.oidcSecurityService.authorize();
  }

  logout() {
      this.oidcSecurityService.logoff();
  }


  private doCallbackLogicIfRequired() {
    console.log(window.location.hash)
    if (window.location.hash) {
        this.oidcSecurityService.authorizedCallback();
    }
  } 
}
