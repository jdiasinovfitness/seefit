import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  profilePhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  userName = 'John Doe';

  public menuItems = [
    //TODO: refactor menu options get from service
    { title: 'Interaction', url: '/platform/interaction', icon: 'home' },
    { title: 'Notifications', url: '/platform/', icon: 'notifications' },
    { title: 'Profile', url: '/user/profile', icon: 'settings' },
  ];

  constructor(private menu: MenuController, private authService: AuthService) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menu.open();
  }

  logOut() {
    this.authService.logOut();
  }
}
