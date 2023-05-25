import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { GlobalStorage } from '../storage/global.storage';
import { ConfigService } from '../services/config.service';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { IonicModule } from '@ionic/angular';
import { EmptyStateComponent } from '../../modules/platform/interaction/empty-state/empty-state.component';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    IonicModule,
  ],
  exports: [
    TranslateModule,
    SafeHtmlPipe,
    EmptyStateComponent,
    IonicModule,
  ],
  providers: [
    AuthService,
    GlobalStorage,
    ConfigService,
  ],
})
export class SharedModule { }
