import { Customer } from 'src/app/core/interfaces/customer.model';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-ici-header',
  templateUrl: './ici-list-header.component.html',
  styleUrls: ['./ici-list-header.component.scss'],
})
export class IciListHeaderComponent implements OnInit {
  @Input() item!: Customer;
  profilePhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor() {}

  ngOnInit(): void {}
}
