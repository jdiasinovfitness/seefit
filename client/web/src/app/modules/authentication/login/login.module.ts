import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LoginComponent } from './login.component';
import { loader } from 'src/app/core/i18n/transloco-loader';
import { SharedModule } from 'src/app/core/shared.module';
import { UiComponentsModule } from '@i9r/ui-components';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiComponentsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'login',
        loader: loader((lang: any) => import(`./_common/i18n/${lang}.json`)),
      },
    },
  ],
})
export class LoginModule {}
