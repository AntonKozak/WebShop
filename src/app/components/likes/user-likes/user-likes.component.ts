import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { Pagination } from '../../../models/pagination';

@Component({
  selector: 'app-user-likes',
  templateUrl: './user-likes.component.html',
  styleUrls: ['./user-likes.component.scss']
})
export class UserLikesComponent implements OnInit{
members: Member[] | undefined;
predicate = 'liked';
pageNumber = 1;
pageSize = 3;
pagination: Pagination | undefined;

private membersService = inject(MembersService);

ngOnInit(): void {
  this.loadLikes();
}

changePredicate(newPredicate: string) {
  this.predicate = newPredicate;
  this.loadLikes();
}

loadLikes() {
  this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
    next: (response) => {
      if (response === undefined) return;
      this.members = response.result;
      this.pagination = response.pagination;
    },
  });
}

pageChanged(event: any) {
  if (this.pageNumber !== event.page) {
  this.pageNumber = event.page;
  this.loadLikes();}
}
}
