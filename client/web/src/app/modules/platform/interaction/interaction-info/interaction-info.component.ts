import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../../../../core/services/data.service';
import {
  IInteraction,
  IITypeData,
} from '../../../../core/interfaces/interaction.model';
import { C_STATUS, Customer } from 'src/app/core/interfaces/customer.model';

export enum Phases {
  loading,
  success,
  created,
}

@Component({
  selector: 'app-interaction-info',
  templateUrl: './interaction-info.component.html',
  styleUrls: ['./interaction-info.component.scss'],
})
export class InteractionInfoComponent {
  statusTypes = C_STATUS;
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  @Input() info!: any; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  typeList!: Array<IITypeData>;
  interactionList: Array<IInteraction> | undefined;
  selectedType: C_STATUS | undefined;
  selectedInteraction: string | undefined;
  selectedInteractionValue: string | undefined;
  details = '';

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {
    this.init();
  }

  async init() {
    this.typeList = await Promise.all(
      this.dataService.getInteractionList()?.map(async (el) => {
        el.label = await firstValueFrom(this.translateService.get(el.label));
        return el;
      })
    );
    this.currentPhase = this.phaseEnum.success;
  }

  async onTypeChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    const index = this.typeList?.findIndex((el) => {
      return el.value === newVal;
    });

    this.selectedType = newVal;
    this.selectedInteraction = undefined;
    this.selectedInteractionValue = '';
    this.interactionList = undefined;
    this.details = '';

    this.interactionList = await Promise.all(
      this.typeList?.[index]?.interaction?.map(async (el) => {
        el.label = await firstValueFrom(this.translateService.get(el.label));
        return el;
      })
    );
  }

  onInteractionChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    this.selectedInteractionValue = '';
    this.selectedInteraction = undefined;
    const index = this.interactionList?.findIndex((el) => el.value === newVal);

    if (typeof index === 'number' && index != -1) {
      this.selectedInteractionValue = this.interactionList?.[index].label || '';
    }

    this.selectedInteraction = newVal;
    this.details = '';
  }

  onDetailsKeyup(event: any) {
    const val = event?.detail?.value;
    this.details = val;
  }

  createInteraction(event: any) {
    const newInteraction = JSON.parse(JSON.stringify(this.info)) as Customer;
    newInteraction.interaction.status = this.selectedType || C_STATUS.UNPLANNED;
    newInteraction.interaction.id = this.selectedInteractionValue || '';
    // newInteraction.interaction.isBold = true;
    // newInteraction.interaction.title = 'INTERACTION:';
    newInteraction.interaction.date = new Date('2023-04-30')
      .toISOString()
      .slice(0, 10);

    // this.dataService.addInteraction(newInteraction);

    this.currentPhase = Phases.created;
    this.handleClick.emit(event);
  }

  updateObservation(event: any) {
    this.handleClick.emit(event);
  }
}
