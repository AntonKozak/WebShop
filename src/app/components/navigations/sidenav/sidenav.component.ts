import { Component } from '@angular/core';

const Small = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  navList = [
    { name: 'Home', icon: 'home', link: '/home' },
    { name: 'Products', icon: 'category', link: '/products'},
    { name: 'Chat', icon: 'message', link: '/chat' },
    { name: 'Users', icon: 'contact_mail', link: '/users' },
    { name: 'Settings', icon: 'settings', link: '/user/edit' },
    { name: 'Admin', icon: 'security', link: '/admin' },
    { name: 'Login', icon: 'login', link: '/login' },
  ];
}
