import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginModel: User ={
    userName: 'string',
    password: 'Pa$$w0rd'
  };

  public accountService = inject(AccountService);
  private router = inject(Router);

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.loginModel).subscribe(
      {
        next: response => console.log(response),
        error: err => console.log(err)
      }
    );
    if(this.accountService.currentUser$) {
      this.router.navigate(['']);
    }
  }

  logout(): void {
    this.accountService.logout();
  }

}
