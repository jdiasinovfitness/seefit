import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { MenuData } from '../../core/interfaces/menu.model';
import { UserService } from '../../core/services/user.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  profilePhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  userName = 'John Doe';
  public menuItems!: Array<MenuData>;
  public originList!: Array<any>;
  selectedOrigin!: number;

  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private userService: UserService,
    public dataService: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit(): void {
    this.menuItems = this.dataService.menuItems;
    this.originList = this.dataService.originList;
    this.selectedOrigin = this.dataService.selectedOrigin;
  }

  onOriginSelect(event: any) {
    const val = event.target.value;
    this.selectedOrigin = val ? val : this.selectedOrigin;
  }

  cancel() {
    this.selectedOrigin = this.dataService.selectedOrigin;
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
    this.dataService.selectedOrigin = this.selectedOrigin;
  }

  navigate(path: string) {
    return; // FIXME: disabled on request of ticket #15683
    this.router.navigate([path]);
    this.menu.close();
  }

  onWillDismiss(event: Event) {
    this.menu.close();
  }

  toggleMenu() {
    this.menu.toggle();
  }

  logOut() {
    this.menu.close();
    this.authService.logOut();
  }
}
