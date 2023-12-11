import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangInfo } from '../interfaces/auth-info.model';
import { BehaviorSubject } from 'rxjs';

export interface I18N {
  lang: string;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class LangService {
  private langSubject = new BehaviorSubject<string>(
    this.translateService.currentLang
  );
  languages: Array<LangInfo> = [
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
  ];

  lang$ = this.langSubject.asObservable();

  constructor(private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((newVal: any) => {
      this.langSubject.next(newVal.lang);
    });
  }

  get currentLang(): string {
    return this.langSubject.getValue();
  }

  set currentLang(lang: string) {
    this.translateService.use(lang);
    this.langSubject.next(lang);
  }

  translate(key: string) {
    return this.translateService.instant(key);
  }

  translateI18n(i18nObjects: I18N[]): string {
    const currentLang = this.currentLang;
    const matchingObject = i18nObjects.find((obj) => obj.lang === currentLang);
    return matchingObject ? matchingObject.text : '';
  }
}
