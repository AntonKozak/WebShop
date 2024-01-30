import { Component, OnInit, inject } from '@angular/core';
import { Message } from '../../models/message';
import { Pagination } from '../../models/pagination';
import { MessageService } from '../../services/messages/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit{
  messages?: Message[] | null;
  pagination?: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe({
        next: (response: any) => {
          this.messages = response?.result;
          this.pagination = response?.pagination;
          this.loading = false;
        },
      });
  }

  changeContainer(newContainer: string) {
    this.container = newContainer;
    this.loadMessages();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }


  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages?.splice(
          this.messages.findIndex((m) => m.id === id),
          );
          this.loadMessages();
        },
      });
  }

}
