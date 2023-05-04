import { Component } from '@angular/core';
import { PEdata } from '../../../core/interfaces/pedata.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-physical-evaluation',
  templateUrl: './physical-evaluation.component.html',
  styleUrls: ['./physical-evaluation.component.scss'],
})
export class PhysicalEvaluationComponent {
  pEData?: PEdata;

  constructor(private dataService: DataService) {}
}
