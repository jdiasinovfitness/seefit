import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NotificationData } from '../../../../core/interfaces/notification.model';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NotificationsComponent implements OnDestroy {
  notificationList!: Array<NotificationData> | undefined;
  notificationSub!: Subscription;

  constructor(public userService: UserService) {
    this.notificationSub = this.userService.notification$.subscribe((res) => {
      res?.forEach((el) => (el.isOpen = false));
      this.notificationList = res;
    });
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
  }

  expand(index: number) {
    if (!this.notificationList) {
      return;
    }
    this.notificationList[index].isOpen =
      !this.notificationList[index].isOpen || false;
  }
}
