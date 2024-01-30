import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toast = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map((user) => {
      if (!user) return false;
      if(user.roles === undefined) return false;

      if(user.roles.includes('Admin') || user.roles.includes('Moderator')) {
        return true;
      } else {
        toast.error('You are not authorized to access this page!')
        return false;
      }

    }),
  );
};
