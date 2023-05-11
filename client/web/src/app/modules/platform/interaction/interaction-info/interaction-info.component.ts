import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { ICIData } from '../../../../core/interfaces/icidata.model';
import { DataService } from '../../../../core/services/data.service';
import { INTERACTION_STATUS } from '../../../../core/constants/status.constants';
import {
  IInteraction,
  IITypeData,
} from '../../../../core/interfaces/interaction.model';

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
  statusTypes = INTERACTION_STATUS;
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  @Input() info!: any; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  typeList!: Array<IITypeData>;
  interactionList: Array<IInteraction> | undefined;
  selectedType: string | undefined;
  selectedInteraction: string | undefined;
  selectedInteractionValue: string | undefined;
  details: string = '';

  constructor(
    private dataService: DataService,
    private translateService: TranslateService
  ) {
    this.init();
  }

  async init() {
    this.typeList = await Promise.all(
      this.dataService.getInteractionList()?.map(async el => {
        el.label = await firstValueFrom(this.translateService.get(el.label));
        return el;
      })
    );
    this.currentPhase = this.phaseEnum.success;
  }

  async onTypeChange(newSelection: any) {
    const index = this.typeList?.findIndex(el => {
      return el.value === newSelection;
    });

    this.selectedType = newSelection;
    this.selectedInteraction = undefined;
    this.selectedInteractionValue = '';
    this.interactionList = undefined;
    this.details = '';

    this.interactionList = await Promise.all(
      this.typeList?.[index]?.interaction?.map(async el => {
        el.label = await firstValueFrom(this.translateService.get(el.label));
        return el;
      })
    );
  }

  onInteractionChange(newSelection: any) {
    this.selectedInteractionValue = '';
    this.selectedInteraction = undefined;
    const index = this.interactionList?.findIndex(
      el => el.value === newSelection
    );

    if (typeof index === 'number' && index != -1) {
      this.selectedInteractionValue = this.interactionList?.[index].label || '';
    }

    this.selectedInteraction = newSelection;
    this.details = '';
  }

  onDetailsKeyup(event: string) {
    this.details = event;
  }

  createInteraction(event: any) {
    const newInteraction = JSON.parse(JSON.stringify(this.info)) as ICIData;
    newInteraction.status = this.selectedType || INTERACTION_STATUS.UNPLANNED;
    newInteraction.interaction.value = this.selectedInteractionValue || '';
    newInteraction.interaction.isBold = true;
    newInteraction.interaction.label = 'INTERACTION:';
    newInteraction.date = new Date('2023-04-30').toISOString().slice(0, 10);

    this.dataService.addInteraction(newInteraction);

    this.currentPhase = Phases.created;
    this.handleClick.emit(event);
  }

  updateObservation(event: any) {
    this.handleClick.emit(event);
  }
}
