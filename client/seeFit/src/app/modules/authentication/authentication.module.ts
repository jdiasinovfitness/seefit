import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetRequestComponent,
    ResetPasswordComponent,
    RegisterComponent,
  ],
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
