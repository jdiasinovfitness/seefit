import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { SharedModule } from './core/shared/shared.module';

export class CustomTranslateLoader implements TranslateLoader {
  constructor() {}

  getTranslation(lang: string): Observable<any> {
    const timestamp = new Date().getTime();
    const url = `${environment.i18nURL}/${lang}.json?timestamp=${timestamp}`;
    return from(fetch(url).then((el: any) => el.json()));
  }
}

export function CustomLoaderFactory() {
  return new CustomTranslateLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ menuType: 'overlay' }),
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'pt-PT',
      loader: {
        provide: TranslateLoader,
        useFactory: CustomLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedModule,
  ],
  exports: [TranslateModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
