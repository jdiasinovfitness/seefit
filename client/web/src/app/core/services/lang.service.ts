import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangInfo } from '../interfaces/auth-info.model';

export interface I18N {
  lang: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private currentLanguage: string;

  languages!: Array<LangInfo>;

  constructor(private translateService: TranslateService) {
    this.currentLanguage = this.translateService.currentLang;
    this.getLangList().then((langList) => {
      this.languages = langList;
    });
  }

  get currentLang(): string {
    return this.currentLanguage;
  }

  set currentLang(lang: string) {
    this.currentLanguage = lang;
    this.translateService.use(lang);
  }

  // FIXME: implement API request
  getLangList(): Promise<Array<LangInfo>> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 'pt-PT',
          name: 'Português',
        },
        {
          id: 'en-EN',
          name: 'English',
        },
        {
          id: 'cs-CS',
          name: 'Český',
        },
      ] as Array<LangInfo>);
    });
  }
}
