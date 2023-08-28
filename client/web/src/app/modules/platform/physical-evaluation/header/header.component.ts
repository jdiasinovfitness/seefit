import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() itemList!: Array<any>;
  @Input() selectionIndex = 0;
  @Input() completedSteps!: boolean[];
  @Input() isStepComplete!: (index: number) => boolean;
  @Input() nextStepClicked = false;
  @Input() isResume: boolean = false;
  @Input() resumeSelected = false;

  constructor() {}
}
