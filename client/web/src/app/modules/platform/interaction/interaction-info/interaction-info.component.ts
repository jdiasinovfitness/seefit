import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  customSelectAlert = {
    header: 'Type',
  };

  constructor(
    private interactionService: InteractionService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.loadSelectionFromLocalStorage();
    this.init();
    if (this.selectedType && this.selectedInteraction) {
      this.interactionList = this.interactionService.getInteractionsByType(
        this.selectedType
      );
    }
  }

  init() {
    this.interaction = this.interactionService.getInteractionById(
      this.info.interaction.id
    );
    this.typeList = this.interactionService.getDummyInteractionTypes();
  }

  saveSelectionToLocalStorage() {
    const userId = this.info.id;
    const selectionData = {
      userId: userId,
      selectedType: this.selectedType,
      selectedInteraction: this.selectedInteraction,
      details: this.details,
    };
    localStorage.setItem(
      `interactionSelection_${userId}`,
      JSON.stringify(selectionData)
    );
  }
  loadSelectionFromLocalStorage() {
    const userId = this.info.id;
    const savedSelection = localStorage.getItem(
      `interactionSelection_${userId}`
    );

    if (savedSelection) {
      const selectionData = JSON.parse(savedSelection);

      this.selectedType = selectionData.selectedType || null;
      this.selectedInteraction = selectionData.selectedInteraction || null;
      this.details = selectionData.details || '';
    }
  }

  clearSelectionFromLocalStorage() {
    const userId = this.info.id;
    localStorage.removeItem(`interactionSelection_${userId}`);
  }

  getStatusTypesArray(): Array<string> {
    return Object.values(this.statusTypes);
  }
  onTypeChange(newSelection: any) {
    const newVal = newSelection?.target?.value;

    const index = this.typeList?.findIndex((el) => {
      return el.id === newVal;
    });

    this.selectedType = newVal;
    this.selectedInteraction = undefined;
    this.selectedInteractionValue = '';
    this.interactionList = undefined;
    this.details = '';

    if (this.selectedType) {
      this.interactionList = this.interactionService.getInteractionsByType(
        this.selectedType
      );
      this.saveSelectionToLocalStorage();
    }
  }

  onInteractionChange(newSelection: any) {
    const newVal = newSelection?.target?.value;

    this.selectedInteractionValue = '';
    this.selectedInteraction = undefined;
    const index = this.interactionList?.findIndex((el) => el.name === newVal);

    if (typeof index === 'number' && index !== -1) {
      this.selectedInteractionValue = (this.interactionList?.[index].name ||
        '') as string;
    }

    this.selectedInteraction = newVal;
    this.details = '';
    this.saveSelectionToLocalStorage();
  }

  onDetailsInput(event: any) {
    const val = event?.target?.value;
    this.details = val;
    this.saveSelectionToLocalStorage();
  }

  createInteraction(event: any) {
    const newInteraction = { ...this.info } as Customer;
    const userId = this.info.id;
    newInteraction.interaction.status = this.selectedType || C_STATUS.UNPLANNED;
    newInteraction.interaction.id = this.selectedInteractionValue || '';
    newInteraction.interaction.date = new Date().toISOString().slice(0, 10);

    this.currentPhase = Phases.created;
    this.handleClick.emit(event);
    this.clearSelectionFromLocalStorage();
  }

  onButtonClick(isSubmit: boolean) {
    this.handleClick.emit({ isSubmit });
  }
  updateObservation(event: any) {
    this.handleClick.emit(event);
  }
}
