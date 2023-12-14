import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { MenuData } from '../../core/interfaces/menu.model';
import { UserService } from '../../core/services/user.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  profilePhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  userName = '';
  public menuItems!: Array<MenuData>;
  public locList!: Array<any>;
  selectedLoc!: number;
  show = false;
  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private userService: UserService,
    public dataService: DataService,
    private modalCtrl: ModalController,
    private configService: ConfigService
  ) {
    this.configService.configChangeEmmitter$.subscribe((ev) => {
      console.log('Recebeu', ev);
      this.show = true;
    });
  }

  ngOnInit(): void {
    this.menuItems = this.dataService.menuItems;
    this.locList = this.configService.getGymnList();
    this.selectedLoc = this.locList[0]?.locationId;
    this.userName = this.userService.getUserInfo()?.name || '';
  }

  onLocationSelect(event: any) {
    const val = event.target.value;
    this.selectedLoc = val ? val : this.selectedLoc;
  }

  cancel() {
    this.selectedLoc = this.dataService.selectedOrigin;
    this.modalCtrl.dismiss();
  }

  confirm() {
    this.modalCtrl.dismiss();
    this.dataService.selectedOrigin = this.selectedLoc;
  }

  navigate(path: string) {
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
