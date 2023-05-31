import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { LangService } from '../../../../core/services/lang.service';
import { UserService } from '../../../../core/services/user.service';
import { MenuData } from '../../../../core/interfaces/menu.model';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-menu',
  templateUrl: './report-menu.component.html',
  styleUrls: ['./report-menu.component.scss'],
})
export class ReportMenuComponent implements OnInit, OnDestroy {
  @Input() isOpen!: boolean;
  @Output() itemClicked = new EventEmitter<any>();

  routeSub$!: Subscription;
  currentRoute = `${window.location.pathname}`;
  reportMenuItems!: Array<MenuData>; // TODO: create interface and refactor to data service

  constructor(
    private dataService: DataService,
    private router: Router,
    public userService: UserService,
    public langService: LangService,

  ) {
    this.routeSub$ = this.router.events.subscribe((el) => {
      if (el instanceof NavigationEnd) {
        // Set current route
        this.currentRoute = el.url;
      }
    });
    this.reportMenuItems = this.dataService.reportMenuItems;
  }

  ngOnInit(): void {
    this.isOpen;
    const fstItem = this.reportMenuItems[0];
    if (!fstItem) { return; }
    this.itemClick(fstItem, 0);
  }

  ngOnDestroy() {
    this.routeSub$.unsubscribe();
  }

  itemClick(item: MenuData, i: number) {
    this.reportMenuItems.forEach((el, index) => el.active = index === i ? true : false)
    this.itemClicked.emit(item);
  }

}
