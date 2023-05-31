import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuData } from '../../../../core/interfaces/menu.model';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ReportViewComponent implements OnInit {
  @Input() item!: MenuData;

  constructor() { }

  ngOnInit() { }

}
