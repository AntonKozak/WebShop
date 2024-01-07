import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../services/members.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  //parent to "components" UserCardComponent
  members$: Observable<Member[]> | undefined;

  private memberService = inject(MembersService);

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    // this.loadMembers();
  }

  // loadMembers(): void {
  //   this.memberService.getMembers()
  //   .subscribe({
  //       next: users => this.members = users,
  //       error: err => console.log(err)
  //     });
  // }
}
