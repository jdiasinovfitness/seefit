import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NotificationData } from '../../../../core/interfaces/notification.model';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

export enum Phases {
  loading,
  empty,
  error,
  success,
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NotificationsComponent implements OnDestroy {
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  notificationList!: Array<NotificationData> | undefined;
  notificationSub!: Subscription;

  constructor(public userService: UserService) {
    this.notificationSub = this.userService.notification$
      .subscribe((res) => {
        const hasNotifications = res && res.length > 0;
        if (!hasNotifications) {
          this.currentPhase = this.phaseEnum.empty;
          this.notificationList = [];
          return;
        }

        res.forEach((el) => (el.isOpen = false))
        this.currentPhase = this.phaseEnum.success;
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
