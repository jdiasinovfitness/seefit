import { Component, OnInit, Input } from '@angular/core';
import { PEdata } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-physical-evaluation',
  templateUrl: './physical-evaluation.component.html',
  styleUrls: ['./physical-evaluation.component.scss'],
})
export class PhysicalEvaluationComponent implements OnInit {
  @Input() pEData?: PEdata;

  constructor() {}

  ngOnInit() {}
}
