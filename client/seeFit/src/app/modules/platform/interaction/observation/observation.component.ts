import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
})
export class ObservationComponent implements OnInit {
  @Input() userId!: string;
  @Input() displayBtn: boolean = true;
  @Output() handleClick = new EventEmitter();

  observation: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchObsFromStorage();
  }

  fetchObsFromStorage() {
    // Persisting observation in localStorage for demo only
    let obs = '';
    try {
      obs = localStorage.getItem(this.userId) || '';
    } catch (error) {
      obs = '';
    }
    this.observation = obs;
  }

  onKeyUp(event: any) {
    if (!this.displayBtn) {
      return;
    }
    const val: string = event.detail.value;

    // Persisting observation in localStorage for demo only
    this.dataService.updateObservation(val, this.userId);
    localStorage.setItem(this.userId, val);
  }

  onButtonClick(isSubmit: boolean) {
    this.handleClick.emit({ isSubmit, userId: this.userId });
  }
}