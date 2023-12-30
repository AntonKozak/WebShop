import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  featuredProducts = [
    { name: 'Exotic Cactus', imageUrl: 'https://randomuser.me/api/portraits/lego/1.jpg', price: '$19.99' },
    { name: 'Colorful Succulent', imageUrl: 'https://randomuser.me/api/portraits/lego/2.jpg', price: '$14.99' },
    { name: 'Rare Plant Species', imageUrl: 'https://randomuser.me/api/portraits/lego/3.jpg', price: '$29.99' },
    { name: 'Focus Ex', imageUrl: 'https://randomuser.me/api/portraits/lego/4.jpg', price: '$12.99' },
    { name: 'The Cactus', imageUrl: 'https://randomuser.me/api/portraits/lego/5.jpg', price: '$29.99' },
    // Add more products as needed
  ];

}
