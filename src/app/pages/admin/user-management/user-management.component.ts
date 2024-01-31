import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { User } from '../../../models/user';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalWindowComponent } from '../../../components/modal-window/modal-window.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit{
  users: User[] = [];
  bsModalRef: BsModalRef<ModalWindowComponent> = new BsModalRef<ModalWindowComponent>();
  availableRoles = [
    'Admin',
    'Moderator',
    'User',
  ];

  private adminService = inject(AdminService);
  private bsModalService = inject(BsModalService);

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  openRolesModal(user: User) {
    const config: ModalOptions = {
      class: 'modal-dialog-centered',
      initialState: {
        username: user.userName,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles!],
      }
    };
    this.bsModalRef = this.bsModalService.show(ModalWindowComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        
        if(!this.arrayEquals(selectedRoles!, user.roles!)) {
          this.adminService.updateUserRoles(user.userName, selectedRoles!).subscribe({
            next: roles => {
              user.roles = roles;
            }
          });
        }
      
      }});
  }

  private arrayEquals(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }

}
