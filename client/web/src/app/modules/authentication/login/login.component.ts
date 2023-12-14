import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

export enum Phases {
  loading,
  empty,
  error,
  success,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  phaseEnum = Phases;
  currentPhase = Phases.empty;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  authForm: FormGroup;
  isSubmitted = false;
  production = environment.production;
  hide = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
  ) {
    this.currentPhase = Phases.empty;
    this.authForm = this.formBuilder.group({
      email: [
        'testes.inovretail@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['TestesNPD2020.', [Validators.required]],
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async signIn() {
    if (!this.authForm.valid) {
      return;
    }
    if (this.currentPhase === this.phaseEnum.loading) {
      return;
    }

    this.currentPhase = Phases.loading;

    const loginInfo = await this.authService
      .login(this.authForm?.value)
      .catch((err) => {
        // TODO: Implement error logic
        console.log('Phases.error', Phases.error);
        this.currentPhase = Phases.error;
        // this.authForm.get('password')?.setErrors({ wrongPassword: true });
      });

    this.router.navigate(['/platform']);
  }
}
