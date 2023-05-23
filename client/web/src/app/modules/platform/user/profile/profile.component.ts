import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LangService } from '../../../../core/services/lang.service';
import { AuthInfo, LangInfo, } from '../../../../core/interfaces/auth-info.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  userData!: AuthInfo;
  newName!: string;
  langList!: Array<LangInfo>;
  userForm!: FormGroup;

  isAlertOpen = false;
  public alertButtons;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private langService: LangService,
  ) {
    this.resetForm();
    this.alertButtons = [
      {
        text: this.langService.translate('user.profile.form.confirm.cancel'),
        role: 'cancel',
      },
      {
        text: this.langService.translate('user.profile.form.confirm.submit'),
        role: 'confirm',
      },
    ];
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setAlert(event: any) {
    this.isAlertOpen = false;
    if (event.detail.role === 'cancel') { return; }

    this.onSubmit();
  }

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

  async onSubmit() {
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

    this.userService.isUserMenuOpen = false;
    this.resetForm();
  }
}
