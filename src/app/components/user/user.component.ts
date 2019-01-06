import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  email: string;

  constructor( private oidcSecurityService: OidcSecurityService) {

    if (this.oidcSecurityService !== undefined) {
        let payload = this.oidcSecurityService.getPayloadFromIdToken();
        console.log(payload)
        if (payload !== '') {
          this.email=payload['email'];
        }
    } else {
        console.debug('OidcSecurityService undefined: NO User email!');
    }
   }

  ngOnInit() {
  }

}
