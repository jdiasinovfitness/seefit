import { Injectable } from '@angular/core';
import { AuthInfo, LangInfo } from '../interfaces/auth-info.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: AuthInfo;
  languages!: Array<LangInfo>;

  constructor(private langService: TranslateService) {
    this.user = this.getDummyAuthData();
    this.languages = this.getDummyLangData();
  }

  getCurrentLang() {
    return this.langService.currentLang;
  }

  getDummyAuthData() {
    const authInfo: AuthInfo = {
      id: '3H8J09',
      acessToken: '',
      refreshToken: '',
      role: 'Instructor',
      name: 'Usain Bolt',
      email: 'usain.bolt@inovfitness.com',
    };
    return authInfo;
  }

  getDummyLangData() {
    // return this.langService.getLangs();
    const langs: Array<LangInfo> = [
      {
        id: 'pt-PT',
        name: 'Português',
      },
      {
        id: 'en-EN',
        name: 'English',
      },
    ];
    return langs;
  }
}
