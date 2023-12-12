import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CustomerService } from 'src/app/core/services/customer.service';
import { Customer } from 'src/app/core/interfaces/customer.model';
import { C_STATUS } from 'src/app/core/interfaces/customer.model';

export enum Phases {
  loading,
  empty,
  error,
  success,
}

@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss'],
})
export class InteractionComponent implements OnInit {
  phaseEnum = Phases;
  currentPhase = Phases.loading;
  @ViewChild(IonModal) modal!: IonModal;

  selectedFilterTab: any;
  list: Array<Customer> = [];
  searchValue = '';
  activeTabList!: Array<string>;
  tabs!: Array<any>;
  currentTab = '0';
  isMobile!: boolean;

  filterList!: Array<Customer>;
  selectedTab = 'All Members';

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  filteredCounts: { [key: string]: number } = {};
  showLoading: boolean = false;

  constructor(
    private dataService: DataService,
    private translateService: TranslateService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init();
    this.list[0]?.name;
    this.applyFilters(this.selectedTab);
  }

  confirm() {
    this.modal.dismiss('', 'confirm');
  }

  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    // this.message = `Hello, ${ev.detail.data}!`;
    // }
  }

  asLink() {
    this.router.navigate(['auth/login']);
  }

  async init() {
    this.currentPhase = Phases.loading;

    this.tabs = [
      {
        title: await firstValueFrom(
          this.translateService.get('interaction.tabs.customer.title')
        ),
        id: 0,
      },
      {
        title: await firstValueFrom(
          this.translateService.get('interaction.tabs.interaction.title')
        ),
        id: 1,
      },
      {
        title: await firstValueFrom(
          this.translateService.get('interaction.tabs.history.title')
        ),
        id: 2,
      },
    ];

    this.filterList = [
      {
        id: 'Planned Int',
        label: 'interaction.status.planned',
        checked: false,
        disabled: false,
        interaction: 'PLANNED',
      },
      {
        id: 'Health Risk',
        label: 'interaction.filters.health-risk',
        checked: false,
        disabled: false,
        healthRisk: true,
      },
      {
        id: 'In Exercise Room',
        label: 'interaction.filters.in-exercise-room',
        checked: false,
        disabled: false,
        inExerciseRoom: true,
      },
      {
        id: 'In Club',
        label: 'interaction.filters.in-club',
        checked: false,
        disabled: false,
        inClub: true,
      },
      {
        id: 'Call Action',
        label: 'interaction.filters.callback',
        checked: false,
        disabled: false,
        callBlock: true,
      },
      {
        id: 'All Members',
        label: 'interaction.filters.all',
        checked: true,
        disabled: false,
        allMembers: true,
      },
    ] as any;

    this.filteredCounts = {};

    await this.loadData();

    this.filterList.forEach((filter) => {
      this.filteredCounts[filter.id] = 0;
    });

    this.filterList.forEach((filter) => {
      const filteredList = this.list.filter((customer: Customer) =>
        this.filterCustomer(customer, filter.id)
      );
      this.filteredCounts[filter.id] = filteredList.length;
    });
  }

  resetData() {
    this.dataService.resetData();
    this.init();
    // this.list[0].
  }

  handleRefresh(event: any) {
    this.loadData();
    event.target.complete();
  }

  onTabChange(event: any, index: number) {
    this.activeTabList[index] = event?.target?.value;
  }

  async loadData() {
    return new Promise((resolve, reject) => {
      const filter = {
        search: this.searchValue,
      } as any;
      this.filterList.forEach((f: any) => (filter[f.id] = f.checked));

      this.currentPhase = Phases.loading;
      this.customerService
        .listCustomers()
        .then((res) => {
          this.list = res?.length > 0 ? res : [];
          if (this.searchValue) {
            this.list = this.list.filter((customer: Customer) => {
              return customer.name
                .toLowerCase()
                .includes(this.searchValue.toLowerCase());
            });
          }

          this.activeTabList = Array.from(
            { length: this.list.length },
            () => '0'
          );
          this.applyFilters(this.selectedFilterTab);

          this.currentPhase =
            this.list?.length === 0 ? Phases.empty : Phases.success;
          resolve(res);
        })
        .catch((err) => {
          console.error(err);
          this.currentPhase = Phases.error;
          reject(err);
        });
    });
  }

  applyFilters(filterId: string) {
    this.selectedFilterTab = filterId;
    this.list = this.list.filter((customer: Customer) =>
      this.filterCustomer(customer, filterId)
    );
    this.filteredCounts[filterId] = this.list.length;
  }

  filterCustomer(customer: Customer, filterId: string): boolean {
    if (filterId === 'Planned Int') {
      return customer.interaction.status === C_STATUS.PLANNED;
    } else if (filterId === 'Health Risk') {
      return customer.healthRisk === true;
    } else if (filterId === 'In Exercise Room') {
      return customer.currentLocation.inExerciseRoom === true;
    } else if (filterId === 'In Club') {
      return customer.currentLocation.inClub === true;
    } else if (filterId === 'Call Action') {
      return customer.interaction.callBlock === true;
    }
    return true;
  }

  onButtonClick(event: any) {
    const { isSubmit, userId } = event;
    if (isSubmit) {
      this.dataService.updateData(userId);
    } else {
      this.dataService.removeInteraction(userId);
    }
    this.loadData();
  }

  handleSearch(newVal: any) {
    this.searchValue = newVal?.target?.value;
    this.loadData();
  }

  onFilterToggle(selectedFilterTab: string) {
    this.showLoading = true;
    this.loadData();
    this.selectedFilterTab = selectedFilterTab;
    this.showLoading = false;
  }

  prevTab() {
    const currentIndex = this.filterList.findIndex(
      (filter) => filter.id === this.selectedFilterTab
    );
    if (currentIndex > 0) {
      this.selectedFilterTab = this.filterList[currentIndex - 1].id;
      this.applyFilters(this.selectedFilterTab);
    }
    this.loadData();
  }

  nextTab() {
    const currentIndex = this.filterList.findIndex(
      (filter) => filter.id === this.selectedFilterTab
    );
    if (currentIndex < this.filterList.length - 1) {
      this.selectedFilterTab = this.filterList[currentIndex + 1].id;
      this.applyFilters(this.selectedFilterTab);
    }
    this.loadData();
  }
}
