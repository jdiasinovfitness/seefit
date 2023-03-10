import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signIn() {
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

  get dark() {
    return document.body.classList.contains('dark-theme');
  }
}
