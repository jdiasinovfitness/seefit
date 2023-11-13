import { Component, EventEmitter, Input, Output } from '@angular/core';
import { C_STATUS, Customer } from 'src/app/core/interfaces/customer.model';
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

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.loadHistory();
  }

  onButtonClick(event: any) {
    this.handleClick.emit(event);
  }

  loadHistory() {
    this.info.historyInfo = this.historyService.getHistoryById(this.info.id);
  }
}
