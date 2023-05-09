import { Component, OnInit } from '@angular/core';
import {
  AuthInfo,
  LangInfo,
} from '../../../../core/interfaces/auth-info.model';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData!: AuthInfo;
  newName!: string;
  langList!: Array<LangInfo>;
  userForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {
    this.resetForm();
  }

  ngOnInit() {}

  resetForm() {
    this.userData = this.userService.user;
    this.langList = [
      { id: 'pt-PT', name: 'Portugues' },
      { id: 'en-EN', name: 'English' },
    ];
    this.userForm = this.formBuilder.group({
      name: [this.userService.user.name, [Validators.required]],
      lang: [this.userService.getCurrentLang(), [Validators.required]],
      password: [''],
    });
  }

  onSubmit(event: any) {
    const { name, lang, password } = this.userForm.value;
    const hasNewName = name && name !== this.userService.user.name;
    const hasNewLang = lang && lang !== this.userService.getCurrentLang();
    const hasNewPassword = password && password !== '';

    if (hasNewName) {
      const instLang = this.translateService.instant(
        'user.profile.form.confirm.name'
      );
      this.toastService.presentToast({ message: instLang });
    }

    if (hasNewLang) {
      this.userService.useLang(lang);
      const instLang = this.translateService.instant(
        'user.profile.form.confirm.lang'
      );
      this.toastService.presentToast({ message: instLang });
    }

    if (hasNewPassword) {
      const instLang = this.translateService.instant(
        'user.profile.form.confirm.password'
      );
      this.toastService.presentToast({ message: instLang });
    }

    this.resetForm();
  }
}
