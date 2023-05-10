import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthInfo } from '../../../../core/interfaces/auth-info.model';
import { DataService } from '../../../../core/services/data.service';
import { UserService } from '../../../../core/services/user.service';
import { LangService } from 'src/app/core/services/lang.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnDestroy {
  routeSub$!: Subscription;
  currentRoute: string = `${window.location.pathname}`;
  userMenuItems!: any; // TODO: create interface and refactor to data service

  constructor(
    private dataService: DataService,
    private router: Router,
    public userService: UserService,
    public langService: LangService
  ) {
    this.routeSub$ = this.router.events.subscribe((el) => {
      if (el instanceof NavigationEnd) {
        // Set current route
        this.currentRoute = el.url;
      }
    });
    this.userMenuItems = this.dataService.userMenuItems;
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }
}
