import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onNameKeyUp(event: any) {
    console.log('NNNN', event); // TODO: Remove on PR!
  }
}
