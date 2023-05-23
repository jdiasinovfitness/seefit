import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { LangInfo } from '../interfaces/auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  langSubject = new BehaviorSubject<string>(this.translateService.currentLang);
  lang$ = this.langSubject?.asObservable();

  languages!: Array<LangInfo>;

  constructor(private translateService: TranslateService) {
    // Update lang data when lang is changed
    this.translateService.onLangChange.subscribe((newVal: any) => {
      this.langSubject.next(newVal.lang);
    });
    this.getLangList().then((langList) => {
      this.languages = langList;
    });
  }

  translate(key: string) {
    return this.translateService.instant(key);
  }

  useLang(lang: string) {
    return firstValueFrom(this.translateService.use(lang));
  }

  async getCurrentLang() {
    return await firstValueFrom(this.lang$);
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
      ] as Array<LangInfo>);
    });
  }
}
