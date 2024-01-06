import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginModel: any ={
    userName: 'string',
    password: 'Pa$$w0rd'
  };

  public accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.loginModel).subscribe(
      {
        next: response => {this.router.navigate([''])},
        error: err => {this.toastr.error(err.error); console.log(err)},
        complete: () => console.log('complete')
      }
    );
  }

  logout(): void {
    this.accountService.logout();
  }

}
