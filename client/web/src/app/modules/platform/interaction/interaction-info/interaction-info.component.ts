import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import {
  C_STATUS,
  Customer,
  InteractionInfo,
} from 'src/app/core/interfaces/customer.model';
import { InteractionService } from 'src/app/core/services/interaction.service';

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

  info: Array<InteractionInfo> = []; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  typeList!: Array<InteractionInfo>;
  interactionList: Array<InteractionInfo> | undefined;
  selectedType: C_STATUS | undefined;
  selectedInteraction: string | undefined;
  selectedInteractionValue: string | undefined;
  details = '';

  constructor(
    private interactionService: InteractionService,
    private translateService: TranslateService
  ) {
    this.init();
  }

  async init() {
    this.typeList = await Promise.all(
      this.interactionService.interactionDummyList().map(async (el) => {
        return el;
      })
    );
    this.currentPhase = this.phaseEnum.success;
  }

  async onTypeChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    this.selectedType = newVal;
    this.selectedInteraction = undefined;
    this.selectedInteractionValue = '';
    this.interactionList = undefined;
    this.details = '';

    if (this.typeList) {
      const filteredInteractions = this.typeList
        .filter((el) => el.type === newVal)
        .map(async (el) => {
          el.type = await firstValueFrom(this.translateService.get(el.type));
          return el;
        });

      this.interactionList = await Promise.all(filteredInteractions);
    }
  }

  onInteractionChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    this.selectedInteractionValue = '';
    this.selectedInteraction = undefined;
    const index = this.interactionList?.findIndex((el) => el.name === newVal);

    if (typeof index === 'number' && index != -1) {
      this.selectedInteractionValue = this.interactionList?.[index].name || '';
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
    // newInteraction.interaction.title = 'INTERACTION:';
    newInteraction.interaction.date = new Date('2023-04-30')
      .toISOString()
      .slice(0, 10);
    // this.interactionService.addInteraction(newInteraction);

    this.currentPhase = Phases.created;
    this.handleClick.emit(event);
  }

  updateObservation(event: any) {
    this.handleClick.emit(event);
  }
}
