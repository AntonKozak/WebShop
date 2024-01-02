import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../../models/member';
import { MembersService } from '../../../services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{
  member: Member | undefined = {} as Member;

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
        this.member = member;
      }
    })
  }
}
