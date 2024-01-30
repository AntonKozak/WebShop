import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';

const Small = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {

  public accountService = inject(AccountService);

  navList = [
    { name: 'Home', icon: 'home', link: '/home', role: 'User' },
    { name: 'Products', icon: 'category', link: '/products', role: 'User'},
    { name: 'Chat', icon: 'message', link: '/chat', role: 'User' },
    { name: 'Users', icon: 'contact_mail', link: '/users', role: 'User' },
    { name: 'Settings', icon: 'settings', link: '/user/edit', role: 'User' },
    { name: 'Login', icon: 'login', link: '/login', role: 'Admin'}
  ];
}
