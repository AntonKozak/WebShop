import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;

  constructor(private toastr: ToastrService) {}

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder().withUrl(
      this.hubUrl + 'presence',
      {
        accessTokenFactory: () => user.token,
      }
    ).withAutomaticReconnect().build();
      
    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('UserIsOnline', (userName) => {
      this.toastr.info(' has connected');
    });
    
    this.hubConnection.on('UserIsOffline', (userName) => {
      this.toastr.warning(userName + ' has disconnected');
    });
  }

  stopHubConnection() {
    this.hubConnection?.stop().catch((error) => console.log(error));
  }

}
