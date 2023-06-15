import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

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
  ) {
    this.authForm = this.formBuilder.group({
      email: ['admin@inovfitness.com', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required]],
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  signIn() {
    if (!this.authForm.valid) {
      return;
    }
    if (this.currentPhase === this.phaseEnum.loading) {
      return;
    }

    this.currentPhase = Phases.loading;
    console.log('this.authForm?.value)', this.authForm?.value); // TODO: Remove on PR!
    this.authService
      .login(this.authForm?.value)
      .then((res) => {
        this.currentPhase = Phases.success;
        this.authForm.get('password')?.setErrors(null);

        this.currentPhase = Phases.empty;
        this.router.navigate(['platform/interaction']);
      })
      .catch((err) => {
        // TODO: Implement error logic
        this.currentPhase = Phases.error;
        console.log('Error', err); // TODO: Remove on PR!

        this.authForm.get('password')?.setErrors({ wrongPassword: true });
        this.router.navigate(['platform/interaction']); // FIXME: remove once done!
      });
  }
}
