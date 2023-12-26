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
    { name: 'Products', icon: 'item', link: '/products'},
    { name: 'About', icon: 'personm', link: '/about' },
    { name: 'Contact', icon: 'contact_mail', link: '/contact' },
    { name: 'Login', icon: 'login', link: '/login' },
  ];
}
