import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, PlatformComponent],
  imports: [CommonModule, PlatformRoutingModule, SharedModule, FormsModule],
})
export class PlatformModule {}
