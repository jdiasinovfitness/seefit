import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICIData } from '../../../../core/interfaces/icidata.model';

@Component({
  selector: 'app-ici-list-header',
  templateUrl: './ici-list-header.component.html',
  styleUrls: ['./ici-list-header.component.scss'],
})
export class IciListHeaderComponent implements OnInit {
  @Input() data!: ICIData;

  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() userId!: string;
  @Input() date!: string;
  @Input() icons!: Array<string>;
  @Input() status!: string;
  @Input() interactionLabel!: string;
  @Input() interaction!: any;
  @Input() primary!: any;
  @Input() secondary!: any;
  @Input() visible = true;
  @Input() isOpen = false;
  @Output() stateChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log('Header ITEM', this.data); // TODO: Remove on PR!
  }

  toggle() {
    const newVal = !this.isOpen;
    this.isOpen = newVal;
    this.stateChange.emit(newVal);
  }
}
