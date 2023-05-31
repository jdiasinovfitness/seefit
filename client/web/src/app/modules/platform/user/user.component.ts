import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

  constructor(public userService: UserService) { }

  close() {
    this.userService.isUserMenuOpen = false;
  }

  itemClicked() {
    this.userService.isUserMenuOpen = true;
  }
}
