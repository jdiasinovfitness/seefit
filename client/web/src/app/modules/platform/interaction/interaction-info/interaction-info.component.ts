import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import {
  C_STATUS,
  Customer,
  InteractionTypes,
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
export class InteractionInfoComponent implements OnInit {
  statusTypes = C_STATUS;
  phaseEnum = Phases;
  currentPhase = Phases.loading;

  @Input() info!: Customer; // TODO: set correct model type after API available
  @Output() handleClick = new EventEmitter();

  typeList!: Array<InteractionTypes>;
  interactionList: Array<InteractionInfo> | undefined;
  selectedType: C_STATUS | undefined;
  selectedInteraction: InteractionInfo | undefined;
  selectedInteractionValue: string | undefined;
  interaction: InteractionInfo | undefined;
  details = '';

  constructor(
    private interactionService: InteractionService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.interaction = this.interactionService.getInteractionById(
      this.info.interaction.id
    );
    this.typeList = this.interactionService.getDummyInteractionTypes();
  }
  getStatusTypesArray(): Array<string> {
    return Object.values(this.statusTypes);
  }
  async onTypeChange(newSelection: any) {
    const newVal = newSelection?.detail?.value;

    const index = this.typeList?.findIndex((el) => {
      return el.id === newVal;
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
    const index = this.interactionList?.findIndex((el) => el.name === newVal);

    if (typeof index === 'number' && index !== -1) {
      this.selectedInteractionValue = (this.interactionList?.[index].name ||
        '') as string;
    }

    this.selectedInteraction = newVal;
    this.details = '';
  }

  onDetailsKeyup(event: any) {
    const val = event?.detail?.value;
    this.details = val;
  }

  createInteraction(event: any) {
    const newInteraction = { ...this.info } as Customer;
    newInteraction.interaction.status = this.selectedType || C_STATUS.UNPLANNED;
    newInteraction.interaction.id = this.selectedInteractionValue || '';
    newInteraction.interaction.date = new Date().toISOString().slice(0, 10);

    this.currentPhase = Phases.created;
    this.handleClick.emit(event);
  }

  onButtonClick(isSubmit: boolean) {
    this.handleClick.emit({ isSubmit });
  }
  updateObservation(event: any) {
    this.handleClick.emit(event);
  }
}
