import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:[ './register.component.scss']
})
export class RegisterComponent {
  registrationModel: any= {};

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  register() {
    this.accountService.register(this.registrationModel).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error); },
    })
  }
}
