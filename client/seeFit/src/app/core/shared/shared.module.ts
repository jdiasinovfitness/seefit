import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { GlobalStorage } from '../storage/global.storage';
import { ConfigService } from '../services/config.service';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    IonicModule,
  ],
  exports: [TranslateModule, SafeHtmlPipe, IonicModule],
  providers: [AuthService, GlobalStorage, ConfigService],
})
export class SharedModule {}
