import { Component } from '@angular/core';
import { MenuData } from '../../../core/interfaces/menu.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  selectedItem!: MenuData;

  constructor(public userService: UserService) { }

  close() {
    this.userService.isReportMenuOpen = false;
  }

  itemClicked(item: MenuData) {
    this.selectedItem = item;
    this.userService.isReportMenuOpen = true;
  }
}
