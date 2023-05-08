import { Component, OnInit } from '@angular/core';
import {
  AuthInfo,
  LangInfo,
} from '../../../../core/interfaces/auth-info.model';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: AuthInfo;
  newName!: string;
  langList!: Array<LangInfo>;
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userData = userService.user;
    this.langList = [
      { id: 'pt-PT', name: 'Portugues' },
      { id: 'en-EN', name: 'English' },
    ];
    this.userForm = this.formBuilder.group({
      name: [userService.user.name, [Validators.required]],
      lang: [userService.getCurrentLang(), [Validators.required]],
      password: ['', [Validators.required]],
    });
    setTimeout(() => {
      console.log(
        'userService.getCurrentLang()',
        this.userService.getCurrentLang()
      ); // TODO: Remove on PR!
    }, 2000);
  }

  ngOnInit() {}

  onNameKeyUp(event: any) {
    console.log('NNNN', event); // TODO: Remove on PR!
  }

  onPwdKeyUp(event: any) {
    const a = event.target.value;
    console.log('NNNN', event, a, a.trim()); // TODO: Remove on PR!
  }
}
