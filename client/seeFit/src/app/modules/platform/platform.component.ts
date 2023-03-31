import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  public appPages = [
    //TODO: refactor menu options get from service
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Logout', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  ngOnInit(): void {}
}
