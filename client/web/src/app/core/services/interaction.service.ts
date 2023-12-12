import { Injectable } from '@angular/core';
import {
  C_STATUS,
  I_TYPE,
  Interaction2BCompleted,
  InteractionInfo,
  InteractionTypes,
} from '../interfaces/customer.model';

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
        type: I_TYPE.ICI,

        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction' }],
        observation:
          '<b> Abby Cannon </b> grade our service a <b> 5 </b> (1-10 scale), which puts her as detractor. Relate to gym floor satisfaction, the evaluation is <b>3</b> (1-10 scale)',
      },
      {
        id: '2',
        name: 'Interaction 2',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: I_TYPE.ICI,

        status: C_STATUS.COMPLETED,
        description: [{ lang: 'en', text: 'Description for Interaction 2' }],
        observation: 'Observation for Interaction 2',
      },
      {
        id: '3',
        name: 'Interaction 3',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,

        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction 3' }],
        observation: 'Observation for Interaction 3',
      },
      {
        id: '4',
        name: 'Interaction 4',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: I_TYPE.ICI,
        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction 4' }],
        observation: 'Observation for Interaction 4',
      },
      {
        id: '5',
        name: 'Interaction 5',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        status: C_STATUS.PLANNED,
        type: I_TYPE.ICI,
        description: [{ lang: 'en', text: 'Description for Interaction 5' }],
        observation: 'Observation for Interaction 5',
      },
      {
        id: '6',
        name: 'Interaction 6',
        date: new Date(2023, 7, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,
        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction 6' }],
        observation: 'Observation for Interaction 6',
      },
      {
        id: '7',
        name: 'Next Visit',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,
        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction 7' }],
        observation: 'Observation for Interaction 7',
      },
      {
        id: '8',
        name: 'Execution Support',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,
        status: C_STATUS.COMPLETED,
        description: [{ lang: 'en', text: 'Description for Interaction 8' }],
        observation: 'Observation for Interaction 8',
      },
      {
        id: '9',
        name: 'Monthly Challenge',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,
        status: C_STATUS.COMPLETED,
        description: [{ lang: 'en', text: 'Description for Interaction 9' }],
        observation: 'Observation for Interaction 9',
      },
      {
        id: '10',
        name: 'Reprogramming',
        date: new Date(2023, 6, 4, 17, 23, 42, 11),
        type: I_TYPE.OCI,
        status: C_STATUS.PLANNED,
        description: [{ lang: 'en', text: 'Description for Interaction 10' }],
        observation: 'Observation for Interaction 10',
      },
    ];
  }

  getDummyInteractionTypes(): Array<InteractionTypes> {
    return [
      {
        id: '1',
        name: [{ lang: 'en', text: 'Unplanned Interactions' }],
        interactions: [
          {
            id: '1',
            name: 'Next Visit',
            date: new Date(),
            type: 'unplanned',
            description: [{ lang: 'en', text: 'Description for Next Visit' }],
            observation: 'Observation for Next Visit',
            status: C_STATUS.PLANNED,
          },
          {
            id: '2',
            name: 'Group Class',
            date: new Date(),
            type: 'unplanned',
            description: [{ lang: 'en', text: 'Description for Group Class' }],
            observation: 'Observation for Group Class',
            status: C_STATUS.PLANNED,
          },
          {
            id: '3',
            name: 'Execution Support',
            date: new Date(),
            type: 'unplanned',
            description: [
              { lang: 'en', text: 'Description for Execution Support' },
            ],
            observation: 'Observation for Execution Support',
            status: C_STATUS.PLANNED,
          },
          {
            id: '4',
            name: 'Monthly Challenge',
            date: new Date(),
            type: 'unplanned',
            description: [
              { lang: 'en', text: 'Description for Monthly Challenge' },
            ],
            observation: 'Observation for Monthly Challenge',
            status: C_STATUS.PLANNED,
          },
          {
            id: '5',
            name: 'Reprogramming',
            date: new Date(),
            type: 'unplanned',
            description: [
              { lang: 'en', text: 'Description for Reprogramming' },
            ],
            observation: 'Observation for Reprogramming',
            status: C_STATUS.PLANNED,
          },
        ],
      },
    ];
  }

  getInteractionById(interactionId: string): InteractionInfo | undefined {
    return this.interactionDummyList().find(
      (item) => item.id === interactionId
    );
  }
  getInteractionsByType(type: C_STATUS): Array<InteractionInfo> {
    return this.interactionDummyList().filter((item) => item.status === type);
  }

  completePlannedInteractions(interaction: Interaction2BCompleted): void {
    // TODO: Implement API Call
    const url = `/interaction/${interaction.id}/complete`;
  }
}
