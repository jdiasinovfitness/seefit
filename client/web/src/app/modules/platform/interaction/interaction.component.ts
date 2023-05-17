import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { ICIData } from '../../../core/interfaces/icidata.model';
import { DataService } from '../../../core/services/data.service';

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

  list: Array<ICIData> = [];
  searchValue = '';
  activeTabList!: Array<string>;
  tabs!: Array<any>;

  filterList!: Array<any>;

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.init();
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
        id: 'inClub',
        label: 'interaction.filters.in-club',
        checked: true,
        disabled: false,
      },
      {
        id: 'excludeAG',
        label: 'interaction.filters.exclude-ag',
        checked: !true,
        disabled: !!false,
      },
      {
        id: 'expired',
        label: 'interaction.filters.expired',
        checked: !true,
        disabled: !!false,
      },
    ] as any;

    this.loadData();
  }

  resetData() {
    this.dataService.resetData();
    this.init();
  }

  onTabChange(tab: string, index: number) {
    this.activeTabList[index] = tab;
  }

  loadData() {
    const filter = {
      search: this.searchValue,
    } as any;
    this.filterList.forEach((f: any) => (filter[f.id] = f.checked));

    this.currentPhase = Phases.loading;
    this.dataService
      .getICIData(filter)
      .then(res => {
        this.list = res?.length > 0 ? res : [];
        this.activeTabList = Array.from(
          { length: this.list.length },
          () => '0'
        );
        this.currentPhase =
          this.list?.length === 0 ? Phases.empty : Phases.success;
      })
      .catch(err => {
        console.error(err);
        this.currentPhase = Phases.error;
      });
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

  handleSearch(newVal: string) {
    this.searchValue = newVal;
    this.loadData();
  }

  handleFilterToggle(newState: boolean, index: number) {
    this.filterList[index].checked = newState;
    this.loadData();
  }
}
