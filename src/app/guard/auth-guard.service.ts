import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private oidcSecurityService: OidcSecurityService) {}
  canActivate(): Observable<boolean> | boolean {
    // if (!this.auth.isAuthenticated()) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    // return true;
    return this.checkUser();
  }


  private checkUser(): Observable<boolean> | boolean {
    console.log('AuthorizationGuard, canActivate');

    return this.oidcSecurityService.getIsAuthorized().pipe(
        tap((isAuthorized: boolean) => {
            console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);
            
    if(!isAuthorized) {
        this.router.navigate(['/login']);
        }
        })
    );
}
}
