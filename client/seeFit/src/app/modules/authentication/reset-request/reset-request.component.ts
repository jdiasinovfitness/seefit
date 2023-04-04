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
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss'],
})
export class ResetRequestComponent implements OnInit {
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

    try {
      setTimeout(() => {
        this.currentPhase = Phases.empty;
        this.router.navigate(['platform/interaction']);
      }, 2000);
    } catch (err) {
      console.error('Error');
    }
  }
}
