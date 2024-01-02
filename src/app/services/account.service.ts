import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoggedUser } from '../models/loggedUser';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseURL = environment.apiUrl;

private currentUserSource = new BehaviorSubject<LoggedUser | null>(null);
currentUser$ = this.currentUserSource.asObservable();

 private http = inject(HttpClient)

  register(model: any) {
    return this.http.post<LoggedUser>(this.baseURL + 'account/register', model)
    .pipe(
      map((user: LoggedUser) => {
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        // return user;
      }
    )
    );
  }

  login(model: any) {
    return this.http.post<LoggedUser>(this.baseURL + 'account/login', model)
    .pipe(
      map((response: LoggedUser) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      }
    )
    );
  }

  setCurrentUser(user: LoggedUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);

  }
}
