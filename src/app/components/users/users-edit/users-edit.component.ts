import { Component, OnInit, ViewChild, inject} from '@angular/core';
import { Member } from '../../../models/member';
import { User } from '../../../models/user';
import { AccountService } from '../../../services/account/account.service';
import { MembersService } from '../../../services/members/members.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit{
  @ViewChild('editForm') editForm: NgForm | undefined;

  member: Member | undefined;
  user: User | null = null;


  constructor(private accountService: AccountService, private memberService: MembersService,
    private toastr: ToastrService) {
    
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
  }

}
