import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private oidcSecurityService: OidcSecurityService
  ) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    // if(this.username == 'admin' && this.password == 'admin'){
    //   localStorage.setItem('token', '1');
    //   this.authService.login();
    //   this.router.navigate(["user"]);
    // }else {
    //   alert("Invalid credentials");
    // }
    // this.authService.login();

    // this.oidcSecurityService.authorize();

    this.oidcSecurityService.authorize((authUrl) => {
      // handle the authorrization URL


      var that = this;
      window.addEventListener('message', function(this, e){
        let hash = e.data.hash;
        console.log("hash received")
        that.oidcSecurityService.authorizedImplicitFlowCallback(hash);
      })
      console.log(authUrl)
      console.log(authUrl)
      window.open(authUrl, '_blank', 'width=350,height=250');
    });
  }
}

