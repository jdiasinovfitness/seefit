import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnDestroy {
  routeSub$!: Subscription;
  currentRoute: string = `${window.location.pathname}`;
  profilePhoto =
    '../../../../../assets/temp_images/userPhotos/profile_blank.jpg';
  userMenuItems!: any; // TODO: create interface and refactor to data service

  constructor(
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.routeSub$ = router.events.subscribe((el) => {
      if (el instanceof NavigationEnd) {
        // Set current route
        this.currentRoute = el.url;
      }
    });
    this.userMenuItems = dataService.userMenuItems;
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }
}
