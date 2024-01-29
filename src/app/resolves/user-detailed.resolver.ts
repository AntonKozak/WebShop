import { ResolveFn } from '@angular/router';
import { Member } from '../models/member';
import { inject } from '@angular/core';
import { MembersService } from '../services/members.service';

//resolves data for a route and returns an object
//loading user data before the component is loaded here with help of resolver in app-routing.module.ts
export const userDetailedResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MembersService);
  return memberService.getMember(route.paramMap.get('username')!);
};
