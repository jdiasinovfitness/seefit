import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICIData } from '../../../../core/interfaces/icidata.model';

@Component({
  selector: 'app-ici-header',
  templateUrl: './ici-list-header.component.html',
  styleUrls: ['./ici-list-header.component.scss'],
})
export class IciListHeaderComponent implements OnInit {
  @Input() item!: ICIData;

  constructor() { }

  ngOnInit(): void { }

}
