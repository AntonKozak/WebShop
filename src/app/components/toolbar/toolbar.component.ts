import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Output() public drawerToggle = new EventEmitter();

  navigationLinks = [
    { tooltip: 'Contact service', icon: 'headset_mic' },
    { tooltip: 'Change language', icon: 'language' },
    { tooltip: 'Change language', icon: 'language' },
    { tooltip: 'Change language', icon: 'language' },
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
