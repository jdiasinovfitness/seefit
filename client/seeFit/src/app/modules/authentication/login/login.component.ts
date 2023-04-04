import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  phaseEnum = Phases;
  currentPhase = Phases.empty;

  authForm: FormGroup;
  isSubmitted = false;
  production = environment.production;
  hide = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email: ['admin@inovfitness.com', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required]],
    });
  }

  ngOnInit(): void {}

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
        // TODO: Implement success logic
        // res.
        // this.currentPhase = error ? Phases.error : Phases.success;
        this.authForm.get('password')?.setErrors(null);
        console.log('Success', res); // TODO: Remove on PR!
        this.router.navigate(['platform/interaction']);
      })
      .catch((err) => {
        // TODO: Implement error logic
        console.log('Error', err); // TODO: Remove on PR!
        this.currentPhase = Phases.error;
        this.authForm.get('password')?.setErrors({ wrongPassword: true });
        this.router.navigate(['platform/interaction']); // FIXME: remove once done!
      });
  }
}
