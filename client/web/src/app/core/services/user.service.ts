import { Injectable } from '@angular/core';
import { AuthInfo } from '../interfaces/auth-info.model';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { NotificationData } from '../interfaces/notification.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new BehaviorSubject<AuthInfo | undefined>(undefined);
  user$ = this.userSubject?.asObservable();

  isUserMenuOpen = false;
  isReportMenuOpen = false;

  notificationSubject = new BehaviorSubject<Array<NotificationData> | undefined>(undefined);
  notification$ = this.notificationSubject?.asObservable();

  constructor() {
    this.fetchUserInfo();
    this.fetchNotificationData();
  }

  // FIXME: implement API request
  async updateUserName(name: string) {
    if (!name) {
      return;
    }
    const usr = await firstValueFrom(this.user$);
    if (!usr) {
      return;
    }
    usr.name = name;
  }

  // FIXME: implement API request
  updateUserPassword(password: string) {
    if (!password) {
      return;
    }
    // this.user.name = name;
  }

  // FIXME: implement API request
  fetchUserInfo() {
    this.userSubject.next(this.getDummyAuthData());
  }

  fetchNotificationData() {
    this.notificationSubject.next(this.getDummyNotificationData());
  }

  getDummyAuthData() {
    const authInfo: AuthInfo = {
      id: '3H8J09',
      acessToken: '',
      refreshToken: '',
      role: 'Instructor',
      avatar: '../../../../../assets/temp_images/userPhotos/profile_blank.jpg',
      name: 'Usain Bolt',
      email: 'usain.bolt@inovfitness.com',
    };
    return authInfo;
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
