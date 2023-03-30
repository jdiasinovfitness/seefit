import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { GlobalStorage } from './storage/global.storage';
import { ConfigService } from './services/config.service';
import { UiComponentsModule } from '@i9r/ui-components';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    UiComponentsModule,
    IonicModule,
  ],
  exports: [TranslateModule, UiComponentsModule, SafeHtmlPipe, IonicModule],
  providers: [AuthService, GlobalStorage, ConfigService],
})
export class SharedModule {}
