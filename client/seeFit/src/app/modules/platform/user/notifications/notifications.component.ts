import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationData } from '../../../../core/interfaces/notification.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class NotificationsComponent implements OnInit {
  // notificationList: Array<NotificationData>;

  constructor(public userService: UserService) {}

  ngOnInit() {}
}
