import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { getPaginatedResult, getPaginationHeaders } from '../paginationHelper';
import { Message } from '../../models/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../../models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Group } from '../../models/group';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;

  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  private hubConnection?: HubConnection;
  private http = inject(HttpClient);

  // Establishes a SignalR hub connection for real-time messaging.
  // This method is invoked when creating a new chat session or opening a chat with a user.
  createHubConnection(user: User, otherUsername: string) {
    // Build a new HubConnection with the provided hub URL and user's access token.
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));
    // Subscribe to the 'ReceiveMessageThread' event to update the local message thread.
    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThreadSource.next(messages);
    });
    // Subscribe to the 'UpdatedGroup' event to handle changes in the message group (e.g., user read a message).
    /// should be the same "UpdatedGroup" as in the api MessageHub.cs OnDisconnectedAsync function
    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some((x) => x.username === otherUsername)) {
        this.messageThread$.pipe(take(1)).subscribe((messages) => {
          messages.forEach((message) => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });
          this.messageThreadSource.next([...messages]);
        });
      }
    });
    // Subscribe to the 'NewMessage' event to handle incoming messages.
    //NewMessage should match in the api MessageHub.cs
    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: (messages) => {
          this.messageThreadSource.next([...messages, message]);
        },
      });
    });
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().catch((error) => console.log(error));
    }
  }
  // Retrieves paginated messages from the API using HTTP.
  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Message[]>(
      this.baseUrl + 'messages',
      params,
      this.http
    );
  }
  // Retrieves the message thread for a specific user.
  getMessageThread(username: string) {
    return this.http.get<Message[]>(
      this.baseUrl + 'messages/thread/' + username
    );
  }
  //using signalR to send message instead of http
  async sendMessage(username: string, content: string) {
    return this.hubConnection
      ?.invoke('SendMessage', {
        recipientUsername: username,
        content,
      })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
