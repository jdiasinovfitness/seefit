import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

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
    this.activatedRoute.queryParams.subscribe(params => {
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
    if (this.currentPhase === this.phaseEnum.loading) {
      return;
    }

    this.currentPhase = Phases.loading;

    setTimeout(() => {
      this.currentPhase = Phases.empty;
    }, 50000);
    try {
      this.router.navigate(['../../platform/interaction'], {
        relativeTo: this.activatedRoute,
      });
    } catch (err) {
      console.error('Error');
    }
  }
}
