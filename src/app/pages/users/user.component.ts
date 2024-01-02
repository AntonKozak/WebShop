import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../services/members.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  //parent to "components" UserCardComponent
  members: Member [] = [];

  private memberService = inject(MembersService);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().pipe(
      tap(members => console.log(members)
      )
    )
    .subscribe({
        next: users => this.members = users,
        error: err => console.log(err)
      });
  }
}
