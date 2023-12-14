import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalStorage } from '../storage/global.storage';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { IonicModule } from '@ionic/angular';
import { EmptyStateComponent } from '../../modules/platform/interaction/empty-state/empty-state.component';
import { SafeIFramePipe } from '../pipes/safe-iframe.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from '../interceptor';

@NgModule({
  declarations: [SafeHtmlPipe, SafeIFramePipe, EmptyStateComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    IonicModule,
  ],
  exports: [
    TranslateModule,
    SafeHtmlPipe,
    SafeIFramePipe,
    EmptyStateComponent,
    IonicModule,
  ],
  providers: [
    GlobalStorage,
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
  ],
})
export class SharedModule {}
