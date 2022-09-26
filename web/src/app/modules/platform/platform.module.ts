import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PlatformRoutingModule } from './platform-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, PlatformRoutingModule],
})
export class PlatformModule {}
