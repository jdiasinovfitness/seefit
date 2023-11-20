import { Component, EventEmitter, Input, Output } from '@angular/core';
import { C_STATUS, Customer } from 'src/app/core/interfaces/customer.model';
import { DataService } from 'src/app/core/services/data.service';
import { HistoryService } from 'src/app/core/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  statusTypes = C_STATUS;
  @Input() info!: Customer; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();
  historyService: any;

  constructor(
    private activityService: HistoryService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }

  loadHistory() {
    console.log('info', this.info);
    const dummyData = this.dataService.getLiveClubDummyList();
    // Assuming there is a valid id in this.info.id
    this.info.historyInfo = this.activityService.getActivityByCustomerId(
      this.info.id
    );
  }
}
