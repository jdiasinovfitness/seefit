import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICIData } from 'src/app/core/interfaces/icidata.model';
import { DataService } from 'src/app/core/services/data.service';

export enum Phases {
  loading,
  empty,
  error,
  success,
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  customer!: ICIData;
  customerId!: string;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.customerId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    return new Promise((resolve, reject) => {
      this.currentPhase = Phases.loading;
      this.dataService
        .getCustomer(this.customerId)
        .then((res) => {
          console.log('RES>>>>', res); // TODO: Remove on PR!
          this.customer = res;
          this.currentPhase =
            this.customer ? Phases.success : Phases.empty;
        })
        .catch((err) => {
          console.error(err);
          this.currentPhase = Phases.error;
          reject(err);
        });
    });
  }
}
