import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from './services/account/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
private accountService = inject(AccountService);


  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const userLocalStorage = localStorage.getItem('user');
    if (!userLocalStorage) return;
    const user: User = JSON.parse(userLocalStorage);
    this.accountService.setCurrentUser(user);
  }
}
