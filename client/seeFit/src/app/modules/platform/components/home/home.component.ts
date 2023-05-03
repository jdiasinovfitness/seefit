import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { PEdata } from 'src/app/core/interfaces/pedata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = Inject(DataService);
  constructor() {}

  getDummyPEData(): Array<PEdata> {
    return this.data.getDummyData();
  }

  ngOnInit(): void {}
}
