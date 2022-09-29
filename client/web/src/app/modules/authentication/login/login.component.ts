import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	authForm: FormGroup;
	isSubmitted = false;

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
		this.isSubmitted = true;
		if (this.authForm.invalid) {
			return;
		}

		this.router.navigate(['../../platform/home'], {
			relativeTo: this.activatedRoute,
		});
	}
}
