import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { AccountService } from './services/account.service';
import { LoggedUser } from './models/loggedUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  data : any;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  // check if user in local storage and set it to current user
  setCurrentUser(): void {
    const userLocalStorage = localStorage.getItem('user');
    if (!userLocalStorage) return;
    const user: LoggedUser = JSON.parse(userLocalStorage);
    this.accountService.setCurrentUser(user);
  }

// its for now to check if we can get data from api...  REMOVE IT LATER
  getAllUsers() {this.http.get('http://localhost:5050/api/users').pipe(
      map((response) => {
        return response;
      })
    ).subscribe(console.log);}
}
