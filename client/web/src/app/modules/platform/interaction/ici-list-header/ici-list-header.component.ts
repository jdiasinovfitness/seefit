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
  orderIcons: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    this.prioritizeIcons();
  }

  // Sort icons by info priority

  prioritizeIcons() {
    if (this.item) {
      let orderIcons = this.item.additionalInfo?.icons || [];

      if (this.item.healthRisk) {
        orderIcons = this.moveToTop(orderIcons, 'ic-2_1');
      }
      const isBirthdayToday = this.isBdayToday(new Date(this.item.dob));
      if (isBirthdayToday) {
        orderIcons = this.moveToTop(orderIcons, 'ic-1_1');
      }
      if (this.item.healthRisk && isBirthdayToday) {
        orderIcons = this.moveToTop(orderIcons, 'ic-2_1');
      }
      this.orderIcons = orderIcons;
    }
  }

  moveToTop(iconArray: string[], icon: string): string[] {
    const iconIndex = iconArray.indexOf(icon);
    if (iconIndex !== -1) {
      iconArray.splice(iconIndex, 1);
    }
    iconArray.unshift(icon);
    return iconArray;
  }

  isBdayToday(birthday: Date): boolean {
    const today = new Date();
    return (
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth()
    );
  }
}
