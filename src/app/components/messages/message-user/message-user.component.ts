import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Message } from '../../../models/message';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-message-user',
  standalone: true,
  templateUrl: './message-user.component.html',
  styleUrl: './message-user.component.scss',
  imports: [CommonModule, FormsModule, TimeagoModule],
})
export class MessageUserComponent {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  @Input() messages?: Message[];

  messageContent = '';

  private messageService = inject(MessageService);

  sendMessage() {
    if (!this.username) return;
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .subscribe({
        next: (message) => {
          this.messages?.push(message);
          this.messageForm?.reset();
        },
      });
  }



}
