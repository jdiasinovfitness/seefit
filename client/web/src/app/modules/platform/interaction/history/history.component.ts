import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  C_STATUS,
  CustomerActivity,
} from 'src/app/core/interfaces/customer.model';
import { HistoryService } from 'src/app/core/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  statusTypes = C_STATUS;
  info: Array<CustomerActivity> = []; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  constructor(private activityService: HistoryService) {}

  ngOnInit() {
    this.loadHistory();
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }

  loadHistory() {
    this.info = this.activityService.activityDummyList();
  }
}
