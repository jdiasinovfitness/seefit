import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { NotificationData } from '../interfaces/notification.model';
import { UserInfo } from '../interfaces/core.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfo: UserInfo | undefined;
  isUserMenuOpen = false;
  isReportMenuOpen = false;

  notificationSubject = new BehaviorSubject<
    Array<NotificationData> | undefined
  >(undefined);
  notification$ = this.notificationSubject?.asObservable();

  constructor() {}

  getUserInfo() {
    return this.userInfo;
  }

  setUserInfo(data: UserInfo) {
    this.userInfo = data;
  }

  // FIXME: implement API request
  async updateUserName(name: string) {
    /* if (!name) {
      return;
    }
    const usr = await firstValueFrom(this.user$);
    if (!usr) {
      return;
    }
    usr.name = name;*/
  }

  // FIXME: implement API request
  updateUserPassword(password: string) {
    if (!password) {
      return;
    }
    // this.user.name = name;
  }

  // FIXME: implement API request for retrive more information about the user
  fetchUserInfo(userId: string) {
    /* this.userSubject.next(user);*/
  }

  getDummyNotificationData() {
    const notificationData: Array<NotificationData> = [
      {
        title: "There's an AF that needs your attention!",
        subtitle:
          'Customer <em>Debora Gomes</em> has an <em>AF</em> due for today. Please finish it and contact the customer!',
        description: '',
        date: '2023-05-20T14:38:40.261Z',
        icon: '../../../../assets/icon/favicon.png',
        isRead: false,
        type: 'TRAINING',
      },
      {
        title: 'Completed Interaction!',
        subtitle:
          'You completed <em>NPS Detractor Interaction</em> with customer <em>Débora Gomes</em>.',
        description:
          '<em>Debora Gomes</em> grade our services a <em>5</em> (1-10 scale), which puts her as a detractor.<p>Relate to gym floor satisfaction, the evaluation is <em>3</em> 0-1 scale)</p>',
        date: '2023-05-19T14:38:40.261Z',
        icon: '../../../../assets/icon/favicon.png',
        isRead: true,
        type: 'INTERACTIONS',
      },
      {
        title: "There's an AF that needs your attention!",
        subtitle:
          'The <em>AF</em> for the customer <em>Paulo Azevedo</em> is completed.',
        description: '',
        date: '2023-05-18T14:38:40.261Z',
        icon: '../../../../assets/icon/favicon.png',
        isRead: true,
        type: 'TRAINING',
      },
    ];
    return notificationData;
  }
}
