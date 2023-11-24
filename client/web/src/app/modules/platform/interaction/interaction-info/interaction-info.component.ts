import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  C_STATUS,
  Customer,
  InteractionInfo,
} from 'src/app/core/interfaces/customer.model';
import { InteractionService } from 'src/app/core/services/interaction.service';
import { I18N } from 'src/app/core/services/lang.service';

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

  @Input() info!: Array<InteractionInfo>; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  typeList!: Array<InteractionInfo>;
  interactionList: Array<InteractionInfo> | undefined;
  selectedType: C_STATUS | undefined;
  selectedInteraction: string | undefined;
  selectedInteractionValue: string | undefined;
  details = '';

  constructor(private interactionService: InteractionService) {
    this.init();
  }

  async init() {
    await this.loadTypeList();
    this.currentPhase = this.phaseEnum.success;
  }

  private async loadTypeList() {
    this.typeList = await Promise.all(
      this.interactionService
        .interactionDummyList()
        .map((el: InteractionInfo) => {
          return el;
        })
    );
  }

  async onTypeChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    const index = this.typeList?.findIndex((el) => {
      return el.description === newVal;
    });

    this.selectedType = newVal;
    this.selectedInteraction = undefined;
    this.selectedInteractionValue = '';
    this.interactionList = undefined;
    this.details = '';
  }

  onInteractionChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    this.selectedInteractionValue = '';
    this.selectedInteraction = undefined;
    const index = this.interactionList?.findIndex((el) => el.id === newVal);

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
  onButtonClick(isSubmit: boolean) {
    this.handleClick.emit({ isSubmit });
  }
}
