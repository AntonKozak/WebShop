import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() public drawerToggle = new EventEmitter();

  public accountService = inject(AccountService);

  navigationLinks = [
    { tooltip: 'Contact service', icon: 'headset_mic' },
    { tooltip: 'Change language', icon: 'language' },
  ];

}
