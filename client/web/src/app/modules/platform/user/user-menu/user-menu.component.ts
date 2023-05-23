import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';
import { UserService } from '../../../../core/services/user.service';
import { LangService } from '../../../../core/services/lang.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @Input() isOpen!: boolean;
  @Output() itemClicked = new EventEmitter<any>();
  routeSub$!: Subscription;
  currentRoute = `${window.location.pathname}`;
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

  ngOnInit(): void {
    this.isOpen;
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }

  itemClick() {
    this.itemClicked.emit();
  }
}
