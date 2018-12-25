import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService) { }
  
  username: string;
  password: string;
  
  ngOnInit() {
  }
  
  login() : void {
    // if(this.username == 'admin' && this.password == 'admin'){
    //   localStorage.setItem('token', '1');
    //   this.authService.login();
    //   this.router.navigate(["user"]);
    // }else {
    //   alert("Invalid credentials");
    // }
    this.authService.login();
  }
}

