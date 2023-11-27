import { Injectable } from '@angular/core';
import { C_TYPE, InteractionInfo } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  interactionData: Array<InteractionInfo> = [];

  constructor() {}

  interactionDummyList(): Array<InteractionInfo> {
    return [
      {
        id: '1',
        name: 'Interaction 1',
        date: new Date(2023, 5, 4, 17, 23, 42, 11),
        type: 'PLANNED',
        description: [{ lang: 'en', text: 'Description for Interaction' }],
        observation: 'Observation for Interaction 1',
      },
      {
        id: '2',
        name: 'Interaction 2',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: 'UNPLANNED',
        description: [{ lang: 'en', text: 'Description for Interaction' }],
        observation: 'Observation for Interaction 1',
      },
      {
        id: '3',
        name: 'Interaction 3',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: 'COMPLETED',
        description: [{ lang: 'en', text: 'Description for Interaction' }],
        observation: 'Observation for Interaction 1',
      },
      {
        id: '4',
        name: 'Interaction 4',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: 'UNPLANNED',
        description: [{ lang: 'en', text: 'Description for Interaction 1' }],
        observation: 'Observation for Interaction 1',
      },
      {
        id: '5',
        name: 'Interaction 5',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: 'PLANNED',
        description: [{ lang: 'en', text: 'Description for Interaction 1' }],
        observation: 'Observation for Interaction 1',
      },
      {
        id: '6',
        name: 'Interaction 6',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: 'COMPLETED',
        description: [{ lang: 'en', text: 'Description for Interaction 1' }],
        observation: 'Observation for Interaction 1',
      },
    ];
  }

  getInteractionByCustomerId(customerId: string): Array<InteractionInfo> {
    const interaction = this.interactionData.filter(
      (item) => item.id === customerId
    );
    console.log(interaction, ' interaction');
    return interaction;
  }

  getInteractionById(interactionId: string): InteractionInfo | undefined {
    return this.interactionData.find((item) => item.id === interactionId);
  }
  getInteractionsByType(type: string): Array<InteractionInfo> {
    return this.interactionData.filter((item) => item.type === type);
  }
}
