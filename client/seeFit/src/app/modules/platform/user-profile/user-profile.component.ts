import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { dropRight } from 'cypress/types/lodash';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['/']);
  }
}
