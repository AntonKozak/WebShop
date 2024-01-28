import { Component, Input, OnInit, inject } from '@angular/core';
import { Message } from '../../../models/message';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TimeagoPipe } from 'ngx-timeago';

@Component({
  selector: 'app-message-user',
  standalone: true,
  templateUrl: './message-user.component.html',
  styleUrl: './message-user.component.scss',
  imports: [CommonModule],
})
export class MessageUserComponent implements OnInit{
  member: Member | undefined;
  messages: Message[] = [];
  
  private memberServise = inject(MembersService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.loadTheUser();
  }

  loadTheUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberServise.getMember(username).subscribe({
      next: (member) => {
        this.member = member
        this.loadMessagaes();
      }
    })
  }

  loadMessagaes() {
    if (!this.member?.userName) return;
    this.messageService.getMessageThread(this.member.userName).subscribe({
      next: (messages) => {
        this.messages = messages;
      }
    });
  }

}
