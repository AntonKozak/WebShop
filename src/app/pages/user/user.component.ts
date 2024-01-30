import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../services/members/members.service';
import { Observable, take, tap } from 'rxjs';
import { Pagination } from '../../models/pagination';
import { User } from '../../models/user';
import { UserFilterParams } from '../../models/userFilterParams';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  //parent to "components" UserCardComponent
  // members$: Observable<Member[]> | undefined;

  members: Member[] = [];
  pagination: Pagination | undefined;
  userFilterParams: UserFilterParams | undefined;
  user: User | undefined;

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if(user) {
          this.userFilterParams = new UserFilterParams();
          this.user = user;
        }
      }
    })
  }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers() {
    if (!this.userFilterParams) return;
    this.memberService.getMembers(this.userFilterParams).subscribe({
      next: (response) => {
        if (response?.pagination && response.result) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      },
    });
    console.log(this.user?.username);
  }

  pageChanged(event: any) {
    if (this.userFilterParams && this.userFilterParams?.page === event.page) return;
    if (!this.userFilterParams) return;
    this.userFilterParams.page = event.page;
    this.loadMembers();
  }
}
