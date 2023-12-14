import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetRequestComponent } from './reset-request/reset-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

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
  providers: [AuthService],
})
export class AuthenticationModule {}
