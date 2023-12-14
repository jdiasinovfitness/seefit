import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformComponent } from './platform.component';
import { SharedModule } from '../../core/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';

@NgModule({
  declarations: [PlatformComponent],
  imports: [CommonModule, PlatformRoutingModule, SharedModule, FormsModule],
  providers: [],
})
export class PlatformModule {}
