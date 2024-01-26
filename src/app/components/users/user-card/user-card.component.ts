import { Component, Input, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
//child to UserComponent
//parent to UserDetailsComponent
@Input() member: Member | undefined;

private membersService = inject(MembersService);
private toastr = inject(ToastrService);

addLike(member: Member) {
  this.membersService.addLike(member.userName).subscribe({
    next: () => {
      this.toastr.success('You have liked ' + member.userName);
    },
  });
  }
}
