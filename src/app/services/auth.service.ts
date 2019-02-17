import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private router: Router,

  ) {
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


  ngOnInit() { }

  ngOnDestroy(): void { }

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
      this.oidcSecurityService.authorizedImplicitFlowCallback();

      //Not ideal... 
      //1) We should get an event, after Auth is done
      //2) We should use the router of the parent instead of the href...
      // window.opener.document.location.href = "./user";
      // setTimeout(function () {
      //   window.close();
      // }, 2000);
    }
  }
}

