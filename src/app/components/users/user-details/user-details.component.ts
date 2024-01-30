import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MatTabsModule } from '@angular/material/tabs';
import { MessageUserComponent } from '../../messages/message-user/message-user.component';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/messages/message.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    GalleryModule,
    MatTabsModule,
    MessageUserComponent,
    TabsModule,
  ],
})
export class UserDetailsComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent | undefined;
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  activeTab: TabDirective | undefined;
  messages: Message[] = [];

  private memberServise = inject(MembersService);
  private route = inject(ActivatedRoute); //Getting access to the route parameters of the current route
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.member = data['member'];
      },
    });

    this.route.queryParams.subscribe({
      next: (params) => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

    this.getImages();
  }

  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find((m) => m.heading === heading)!.active = true;
    }
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.member) {
      this.loadMessages();
    }
  }

  loadMessages() {
    if (!this.member) return;
    this.messageService.getMessageThread(this.member.userName).subscribe({
      next: (messages) => {
        this.messages = messages;
      },
    });
  }

  //Getting access to the photos of the current user and adding them to the gallery by ImageItem class from ng-gallery module
  getImages() {
    if (!this.member?.photos) return;
    for (const photo of this.member?.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
    }
  }
}
