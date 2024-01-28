import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { MatTabsModule } from '@angular/material/tabs';
import { MessageUserComponent } from '../../messages/message-user/message-user.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  imports: [CommonModule, RouterModule, GalleryModule, MatTabsModule, MessageUserComponent],
})
export class UserDetailsComponent implements OnInit{
  member: Member | undefined;
  images: GalleryItem[] = [];

  private memberServise = inject(MembersService);
  private route = inject(ActivatedRoute);//Getting access to the route parameters of the current route

  ngOnInit(): void {
    this.loadTheUser();
  }

  loadTheUser(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberServise.getMember(username).subscribe({
      next: (member) => {
        this.member = member,
        this.getImages();
      }
    })
  }
  //Getting access to the photos of the current user and adding them to the gallery by ImageItem class from ng-gallery module
  getImages(){
    if(!this.member?.photos) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}
