import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
// remove elemnts from DOM if user does not have conditions
//if user has role admin, moderator then angular show elements
@Input() appHasRole: string[] = [];
user: User = {} as User;

constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private accountService: AccountService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe({
    next: (user) => {
    if (user) this.user = user;
  }})
}

ngOnInit(): void {
  const roles = Array.isArray(this.appHasRole) ? this.appHasRole : [this.appHasRole];

  if (this.user.roles?.some((r) => roles.includes(r))) {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  } else {
    this.viewContainerRef.clear();
  }
}
}
