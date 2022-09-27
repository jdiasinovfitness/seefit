import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PlatformRoutingModule } from './platform-routing.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, PlatformRoutingModule, TranslocoModule],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'platform'
  }]
})
export class PlatformModule {}
