import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { THRESHOLDS } from 'src/app/core/constants/config.constants';
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
  @HostListener('window:resize', ['$event']) onResize() {
    this.isMobile = window.innerWidth >= THRESHOLDS.MOBILE_THRESHOLD;
  }
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  customer!: ICIData;
  customerId!: string;
  tabList!: Array<any>;

  innerWidth!: number;

  currentTab = '0';
  isMobile!: boolean; // FIXME: set according to screen size

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
  ) {
    this.customerId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.isMobile = window.innerWidth >= THRESHOLDS.MOBILE_THRESHOLD;
    this.loadData();
    this.getTabs();
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

  onTabChange(event: any, index: number) {
    console.log('AAA', event, index); // TODO: Remove on PR!
  }

  prevTab(event: any) {
    const newTab = Number(this.currentTab) > 0 ? (Number(this.currentTab) - 1).toString() : this.currentTab;
    this.currentTab = newTab;
  }

  nextTab(event: any) {
    const newTab = Number(this.currentTab) < this.tabList.length - 1 ? (Number(this.currentTab) + 1).toString() : this.currentTab;
    this.currentTab = newTab;

  }


  async getTabs() {
    this.tabList = [
      {
        id: '0',
        disabled: false,
        title: await firstValueFrom(
          this.translateService.get('customer.tabs.information.title')
        ),
      },
      {
        id: '1',
        disabled: false,
        title: await firstValueFrom(
          this.translateService.get('customer.tabs.lifecycle.title')
        ),
      },
      {
        id: '2',
        disabled: false,
        title: await firstValueFrom(
          this.translateService.get('customer.tabs.history.title')
        ),
      },
      {
        id: '3',
        disabled: false,
        title: await firstValueFrom(
          this.translateService.get('customer.tabs.metrics.title')
        ),
      },
    ]
  }

}
