import { Injectable } from '@angular/core';
import { AuthInfo } from '../interfaces/auth-info.model';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userSubject = new BehaviorSubject<AuthInfo | undefined>(undefined);
  user$ = this.userSubject?.asObservable();

  constructor() {
    this.fetchUserInfo();
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
}
