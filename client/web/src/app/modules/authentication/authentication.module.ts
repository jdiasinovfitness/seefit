import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../core/shared.module';

@NgModule({
  declarations: [LoginComponent, ResetRequestComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    IonicModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [SharedModule],
})
export class AuthenticationModule {}
