import { Component, Input, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { GalleryItem } from 'ng-gallery';
import { MembersService } from '../../../services/members.service';
import { Photo } from '../../../models/photos';
import { User } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  images: GalleryItem[] = [];
  user: User | undefined | null;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          this.member.mainPhotoUrl = photo.url;
          this.member.photos.forEach((p) => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          });
        }
      }
    })
  }

}
