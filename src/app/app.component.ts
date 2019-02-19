import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { FileSaverService } from 'ngx-filesaver';


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
    private oidcSecurityService: OidcSecurityService,
    private FileSaverService: FileSaverService
  ) { }

  isLoggedIn() {
    return this.oidcSecurityService.getIsAuthorized();
  }

  userData() {
    return this.oidcSecurityService.getUserData()
  }

  logout() {
    this.oidcSecurityService.logoff();
    this.router.navigate(["login"]);
  }

  save() {
      let theJSON = JSON.stringify( localStorage.getItem("workingSlots"));
      let blob = new Blob([theJSON], { type: 'text/json' });
      // let url= window.URL.createObjectURL(blob);
      // let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      // this.downloadJsonHref = uri;

      this.FileSaverService.save(blob, "app_backup.json");
  }

  getSaveContent() {
    return localStorage.getItem("workingSlots");
  }

}
