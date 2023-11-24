import { Injectable } from '@angular/core';
import { InteractionInfo } from '../interfaces/customer.model';

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
        name: 'string',
        date: new Date(2023, 5, 4, 17, 23, 42, 11),
        type: 'string',
        description: [{ lang: 'en', text: '' }],
        observation: 'string',
      },
      {
        id: '2',
        name: 'string',
        date: new Date(),
        type: 'string',
        description: [{ lang: 'en', text: '' }],
        observation: 'string',
      },
      {
        id: '3',
        name: 'string',
        date: new Date(),
        type: 'string;',
        description: [{ lang: 'en', text: '' }],
        observation: 'string;',
      },
      {
        id: '4',
        name: 'string',
        date: new Date(),
        type: 'string',
        description: [{ lang: 'en', text: '' }],
        observation: 'string',
      },
      {
        id: '4',
        name: 'string',
        date: new Date(),
        type: 'string',
        description: [{ lang: 'en', text: '' }],
        observation: 'string',
      },
    ];
  }

  getInteractionByCustomerId(customerId: string): Array<InteractionInfo> {
    const interaction = this.interactionData.filter(
      (item) => item.id === customerId
    );
    return interaction;
  }

  getInteractionById(interactionId: string): InteractionInfo | undefined {
    return this.interactionData.find((item) => item.id === interactionId);
  }
}
