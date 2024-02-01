import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;

  private onlaineUsersSource = new BehaviorSubject<string[]>([]);
  onlaineUsers$ = this.onlaineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder().withUrl(
      this.hubUrl + 'presence',
      {
        accessTokenFactory: () => user.token,
      }
    ).withAutomaticReconnect().build();
      
    this.hubConnection.start().catch((error) => console.log(error));
      //UserIsOnline should match in the api PresenceHub.cs
    this.hubConnection.on('UserIsOnline', (userName) => {
      this.toastr.info(' has connected');
    });
    //UserIsOffline should match in the api PresenceHub.cs
    this.hubConnection.on('UserIsOffline', (userName) => {
      this.toastr.warning(userName + ' has disconnected');
    });
    //GetOnlineUsersFromAPI should match in the api PresenceHub.cs
    this.hubConnection.on('GetOnlineUsersFromAPI', (usernames: string[]) => {
      this.onlaineUsersSource.next(usernames);
    });

    //"NewMessageReceived" should match in the api MessageHub.cs
    this.hubConnection.on('NewMessageReceived', ({username}) => {
      this.toastr.info(username + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        .subscribe(
          {
            next: () => this.router.navigateByUrl('/users/' + username + '?tab=Messages'),
          }
          );
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }

}
