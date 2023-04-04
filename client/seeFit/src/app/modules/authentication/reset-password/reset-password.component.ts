import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export enum Phases {
  loading,
  empty,
  error,
  success,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  phaseEnum = Phases;
  currentPhase = Phases.empty;

  authForm: FormGroup;
  isSubmitted = false;
  production = environment.production;
  hide = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        passwordConfirmation: ['', [Validators.required]], //TODO: Validator for password match
      },
      {
        validators: this.MustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      // TODO: get query param
      console.log('params', params); // TODO: Remove on PR!
    });
  }

  MustMatch(pwd1: any, pwd2: any) {
    return (formGroup: FormGroup) => {
      const pwdControl = this.authForm?.controls['password'];
      const pwdCControl = this.authForm?.controls['passwordConfirmation'];

      const doesNotMatch = pwdControl?.value !== pwdCControl?.value;
      pwdCControl?.setErrors(doesNotMatch ? { mustMatch: true } : null);
    };
  }

  signIn() {
    if (!this.authForm.valid) {
      return;
    }
    if (this.currentPhase === this.phaseEnum.loading) {
      return;
    }

    this.currentPhase = Phases.loading;

    try {
      setTimeout(() => {
        const error = !true;
        this.authForm
          .get('password')
          ?.setErrors(error ? { wrongPassword: true } : null);

        this.currentPhase = error ? Phases.error : Phases.success;

        // TODO: handle navigation error when permission claims available
        this.router.navigate(['platform/interaction']);
      }, 2000);
    } catch (err) {
      console.error('Error');
    }
  }
}
