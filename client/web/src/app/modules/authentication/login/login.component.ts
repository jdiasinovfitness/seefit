import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	authForm: FormGroup;
	isSubmitted = false;
	production = environment.production;
	hide = false;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private auth: AuthService
	) {
		this.authForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	ngOnInit(): void {}

	// sign in to plataform
	async signIn() {
		try {
			this.isSubmitted = true;
			if (this.authForm.invalid) {
				return;
			}

			if (!this.production) {
				await this.auth.login(this.authForm.value);
			}

			this.router.navigate(['../../platform'], {
				relativeTo: this.activatedRoute,
			});
		} catch (err) {
			console.log('Errr');
		}
	}

	get dark() {
		return document.body.classList.contains('dark-theme');
	}
}
