import { Component, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:[ './register.component.scss']
})
export class RegisterComponent {
  registrationModel: any= {};

  private accountService = inject(AccountService);

  register() {
    this.accountService.register(this.registrationModel).subscribe({})
  }
}
