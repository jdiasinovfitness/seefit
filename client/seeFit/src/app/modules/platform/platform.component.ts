import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { MenuData } from '../../core/interfaces/menu.model';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  profilePhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  userName = 'John Doe';
  public menuItems!: Array<MenuData>;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.menuItems = this.dataService.menuItems;
  }

  toggleMenu() {
    this.menu.toggle();
  }

  logOut() {
    this.menu.close();
    this.authService.logOut();
  }
}
