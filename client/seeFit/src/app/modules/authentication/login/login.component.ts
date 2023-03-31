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

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      email: ['admin@inovfitness.com', [Validators.required, Validators.email]],
      password: ['admin', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.currentPhase === this.phaseEnum.loading) {
      return;
    }

    this.currentPhase = Phases.loading;

    setTimeout(() => {
      const error = !true;
      this.authForm
        .get('password')
        ?.setErrors(error ? { wrongPassword: true } : null);

      this.currentPhase = error ? Phases.error : Phases.success;

      // TODO: handle navigation error when permission claims available
      this.router.navigate(['platform/interaction']);
    }, 2000);
  }
}
