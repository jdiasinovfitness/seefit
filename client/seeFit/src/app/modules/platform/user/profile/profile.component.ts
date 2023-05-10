import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { firstValueFrom } from 'rxjs';
import { LangService } from 'src/app/core/services/lang.service';
import {
  AuthInfo,
  LangInfo,
} from '../../../../core/interfaces/auth-info.model';

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
    public userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private langService: LangService
  ) {
    this.resetForm();
  }

  ngOnInit() {}

  async resetForm() {
    const usr = await firstValueFrom(this.userService.user$);
    const lang = await this.langService.getCurrentLang();
    if (!usr || !lang) {
      return;
    }

    this.userData = usr;
    this.langList = await this.langService.getLangList();
    this.userForm = this.formBuilder.group({
      name: [usr?.name, [Validators.required]],
      lang: [lang, [Validators.required]],
      password: [''],
    });
  }

  async onSubmit(event: any) {
    const usr = await firstValueFrom(this.userService.user$);
    const { name, lang, password } = this.userForm.value;
    const hasNewName = name && name !== usr?.name;
    const hasNewLang = lang && lang !== this.langService.getCurrentLang();
    const hasNewPassword = password && password !== '';

    if (hasNewName) {
      await this.userService.updateUserName(name);
      const instLang = this.langService.translate(
        'user.profile.form.confirm.name'
      );
      this.toastService.presentToast({ message: instLang });
    }

    if (hasNewLang) {
      await this.langService.useLang(lang);
      const instLang = this.langService.translate(
        'user.profile.form.confirm.lang'
      );
      this.toastService.presentToast({ message: instLang });
    }

    if (hasNewPassword) {
      await this.userService.updateUserPassword(password);
      const instLang = this.langService.translate(
        'user.profile.form.confirm.password'
      );
      this.toastService.presentToast({ message: instLang });
    }

    this.resetForm();
  }
}
