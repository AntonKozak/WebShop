import { Component, Input } from '@angular/core';
import { Member } from '../../../models/member';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
//child to UserComponent
//parent to UserDetailsComponent
@Input() member: Member | undefined;

}
