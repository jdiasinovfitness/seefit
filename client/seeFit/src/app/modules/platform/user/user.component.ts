import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  isOpen = true;

  constructor() {}

  close() {
    this.isOpen = false;
  }

  onOpen() {
    this.isOpen = true;
  }
}
