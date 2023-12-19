import { Component } from '@angular/core';

const Small = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  navList = [
    { name: 'Home', icon: 'home' },
    { name: 'About', icon: 'person' },
    { name: 'Contact', icon: 'contact_mail' },
    { name: 'Contact', icon: 'contact_mail' },
    { name: 'Contact', icon: 'contact_mail' },
  ];
}
