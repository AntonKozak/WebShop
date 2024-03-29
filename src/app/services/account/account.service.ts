import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LoggedUser } from '../../models/loggedUser';
import { environment } from '../../../environments/environment.development';
import { PresenceService } from '../presence/presence.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL = environment.apiUrl;

  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  private http = inject(HttpClient);
  private presenceService = inject(PresenceService);

  register(model: any) {
    return this.http
      .post<LoggedUser>(this.baseURL + 'account/register', model)
      .pipe(
        map((user: LoggedUser) => {
          if (user) {
            this.setCurrentUser(user);
          }
          // return user;
        })
      );
  }

  login(model: any) {
    return this.http
      .post<LoggedUser>(this.baseURL + 'account/login', model)
      .pipe(
        map((response: LoggedUser) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    //Connect SignalR
    this.presenceService.createHubConnection(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
      //Disconnect SignalR
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
