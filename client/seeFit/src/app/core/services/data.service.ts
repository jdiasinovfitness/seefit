import { Injectable } from '@angular/core';
import { INTERACTION, INTERACTION_STATUS } from '../constants/status.constants';
import { ICIData, ICIFilter } from '../interfaces/icidata.model';
import { IITypeData } from '../interfaces/interaction.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data!: Array<ICIData>;
  interactionList!: Array<IITypeData>;

  constructor() {
    this.data = this.getDummyData();
    this.interactionList = this.getDummyInteractionData();
  }

  resetData() {
    this.getDummyData();
  }

  getInteractionList(): Array<IITypeData> {
    return this.interactionList ? this.interactionList : [];
  }

  addInteraction(newInteraction: ICIData) {
    this.data.unshift(newInteraction);
  }

  removeInteraction(userId: string) {
    const index = this.data.findIndex((el) => el.userId === userId);
    if (index === -1) {
      return;
    }
    this.data.splice(index, 1);
  }

  updateData(userId: string) {
    const index = this.data.findIndex((el) => el.userId === userId);
    if (index === -1) {
      return;
    }
    this.data[index].status = INTERACTION_STATUS.COMPLETED;
  }

  updateObservation(newState: string, id: string) {
    const index = this.data.findIndex((el) => el.userId === id);
    if (index === -1) {
      return;
    }

    this.data[index].customerInfo.observation = newState;
  }

  getICIData(filter?: ICIFilter): Promise<Array<ICIData>> {
    return new Promise((resolve, reject) => {
      if (!filter) {
        resolve(this.data);
        return;
      }

      const res = this.data
        // Remove duplicates
        .filter(
          (value, index, self) =>
            index === self.findIndex((e) => e.userId === value.userId)
        )
        // With filter for inClub, excludeAG, expired, name, id, date, interaction.
        .filter(
          (el) =>
            (!filter.inClub ||
              (((filter.inClub && !!el.inClub) || !filter.inClub) &&
                filter.excludeAG === el.excludeAG &&
                ((filter.expired && el.status === 'PLANNED') ||
                  !filter.expired))) &&
            JSON.stringify(el)
              .toLocaleLowerCase()
              .includes(filter.search.toLocaleLowerCase())
        );

      setTimeout(() => {
        resolve(res);
      }, 400);
    });
  }

  getDummyInteractionData() {
    return [
      {
        label: 'interaction.type.unplanned',
        value: 'unplanned',
        interaction: [
          {
            label: 'interaction.label.next_visit',
            value: INTERACTION.NEXT_VISIT,
          },
          {
            label: 'interaction.label.group_class',
            value: INTERACTION.GROUP_CLASS,
          },
          {
            label: 'interaction.label.execution_support',
            value: INTERACTION.EXECUTION_SUPPORT,
          },
          {
            label: 'interaction.label.monthly_challenge',
            value: INTERACTION.MONTHLY_CHALLENGE,
          },
          {
            label: 'interaction.label.reprogramming',
            value: INTERACTION.REPROGRAMMING,
          },
        ],
      },
    ];
  }

  getDummyData(): Array<ICIData> {
    return [
      {
        title: 'Sarah Holloway',
        userId: 'N#3929',
        status: INTERACTION_STATUS.PLANNED,
        inClub: true,
        excludeAG: false,

        date: '2023-03-20',
        interaction: {
          label: 'INTERACTION:',
          value: 'NPS Detractor',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: '19%',
          color: '#cccc00',
        },
        secondary: {
          label: 'USAGE:',
          value: 'C+',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female1.jpg',
        interactionInfo:
          'Sarah Holloway grade our service 5 (1-10 scale), which puts her as a detractor. Related to gym floor satisfaction, the evaluation is 8.',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1982-02-08 (41)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Weight Loss',
              },
              {
                key: 'interaction.data.access',
                value: '2/7/19/97',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/1/3',
              },
              {
                key: 'interaction.data.shareAG',
                value: '3%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2022-12-14 (97)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '57 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2020-11-30 (28)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '29$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: '07:00 - 18:00 | 20:30 - 22:00',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Edmund Jacobson',
        userId: 'N#8629',
        status: INTERACTION_STATUS.PLANNED,
        inClub: true,
        excludeAG: false,

        date: '2023-03-21',
        interaction: {
          label: 'INTERACTION:',
          value: 'First 2-weeks, 1 visit',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: 'n/a',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male1.jpg',
        interactionInfo:
          "Edmund Jacobson started his membership on 2023-03-09, but only visit one time in the first 2 weeks. It's important to sensibilize the customer regarding the importance of the onboarding, namely by the definition of a weekly schedule of workouts (at least twice a week)",
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1996-07-01 (28)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Toning',
              },
              {
                key: 'interaction.data.access',
                value: '0/1/1/1',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.shareAG',
                value: '0%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2023-03-09 (12)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '78 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2023-03-08 (1)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '39$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 0,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Alan Rivers',
        userId: 'N#3203',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: true,
        excludeAG: false,

        date: '2023-03-21',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Cycle Completed',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '5%',
          color: '#00FF00',
        },
        secondary: {
          label: 'USAGE:',
          value: 'A++',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male2.jpg',
        interactionInfo:
          "Alan Rivers has completed the REP_2 program with 13 visits on 4 weeks. It's time to congratulate the member, pushing for even higher usage in the following weeks.",
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1966-10-22 (68)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Improve well-being',
              },
              {
                key: 'interaction.data.access',
                value: '3/13/25/137',
              },
              {
                key: 'interaction.data.ag',
                value: '1/5/11/46',
              },
              {
                key: 'interaction.data.shareAG',
                value: '43%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2023-01-17 (63)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '62 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2021-01-30 (26)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '9.9$ / Week',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: '1 PT session / week',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Jana Miller',
        userId: 'N#3204',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: true,
        excludeAG: false,

        date: '2023-03-16',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Churn Risk Increase',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '26%',
          color: '#FFA500',
        },
        secondary: {
          label: 'USAGE:',
          value: 'C-',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female2.jpg',
        interactionInfo:
          'Jana Miller had an increase of risk in 8pp in the last 14 days (currently at 26%). As this is generated by an algorithm, check the customer tab for deep-diving purposes',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1990-08-05 (32)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Gain weight/muscle',
              },
              {
                key: 'interaction.data.access',
                value: '0/4/10/88',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/13',
              },
              {
                key: 'interaction.data.shareAG',
                value: '15%',
              },
              {
                key: 'interaction.data.last-af',
                value: 'n/a',
              },
              {
                key: 'interaction.data.visit-length',
                value: '53 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2021-03-30 (24)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '24$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: '07:00 - 17:00',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Rupert Horton',
        userId: 'N#2390',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: true,
        excludeAG: false,
        date: '2023-02-04',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Usage A -> B',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '11%',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'B',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male3.jpg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1982-06-29 (40)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Improve well-being',
              },
              {
                key: 'interaction.data.access',
                value: '1/10/24/203',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.shareAG',
                value: '0%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2022-10-03 (169)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '58 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2021-07-08 (20)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '39$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Abby Cannon',
        userId: 'N#7187',
        status: INTERACTION_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2023-03-21',
        interaction: {
          label: 'INTERACTION:',
          value: 'First Day',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: 'n/a',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female3.jpg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '2000-04-22 (22)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Gain weight/muscle',
              },
              {
                key: 'interaction.data.access',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.shareAG',
                value: '0%',
              },
              {
                key: 'interaction.data.last-af',
                value: 'n/a',
              },
              {
                key: 'interaction.data.visit-length',
                value: 'n/a',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2023-03-17 (1)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '9.9$ / Week',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 0,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Alice Williamson',
        userId: 'N#4812',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: false,
        excludeAG: false,

        date: '2023-03-15',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Low Motivation',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '21%',
          color: '#FFA500',
        },
        secondary: {
          label: 'USAGE:',
          value: 'C',
          color: '#000000',
        },
        imageUrl: 'assets/icons/no-avatar.svg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1971-11-02 (51)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Weight Loss',
              },
              {
                key: 'interaction.data.access',
                value: '1/5/9/85',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/1',
              },
              {
                key: 'interaction.data.shareAG',
                value: '1%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2022-08-09 (201)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '82 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2018-09-23 (54)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '22.5$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'Nutrition Plan',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Tim Shepard',
        userId: 'N#9027',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: false,
        excludeAG: false,

        date: '2023-02-23',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Sleeper User',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '35%',
          color: '#FF0000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'D',
          color: '#000000',
        },
        imageUrl: 'assets/icons/no-avatar.svg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1990-08-05 (32)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Toning',
              },
              {
                key: 'interaction.data.access',
                value: '1/1/1/9',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.shareAG',
                value: '0%',
              },
              {
                key: 'interaction.data.last-af',
                value: 'n/a',
              },
              {
                key: 'interaction.data.visit-length',
                value: '61 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2022-09-01 (7)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '39$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: 'Unrestricted',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Helena Saunders',
        userId: 'N#5653',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: false,
        excludeAG: false,

        date: '2023-01-19',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Cycle 75% Under',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '9%',
          color: '#00FF00',
        },
        secondary: {
          label: 'USAGE:',
          value: 'B-',
          color: '#000000',
        },
        imageUrl: 'assets/icons/no-avatar.svg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1981-12-08 (41)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Improve well-being',
              },
              {
                key: 'interaction.data.access',
                value: '0/9/19/118',
              },
              {
                key: 'interaction.data.ag',
                value: '0/9/19/116',
              },
              {
                key: 'interaction.data.shareAG',
                value: '99%',
              },
              {
                key: 'interaction.data.last-af',
                value: '2023-01-29 (51)',
              },
              {
                key: 'interaction.data.visit-length',
                value: '46 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2022-03-08 (12)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '29$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: '07:00 - 18:00 | 20:30 - 22:00',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },

      {
        title: 'Walter Wiggins',
        userId: 'N#1903',
        status: INTERACTION_STATUS.COMPLETED,
        inClub: false,
        excludeAG: false,

        date: '2022-10-19',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Medium Churn Risk',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '29%',
          color: '#FFA500',
        },
        secondary: {
          label: 'USAGE:',
          value: 'E',
          color: '#000000',
        },
        imageUrl: 'assets/icons/no-avatar.svg',
        interactionInfo: '',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '1960-04-22 (62)',
              },
              {
                key: 'interaction.data.objective',
                value: 'Improve well-being',
              },
              {
                key: 'interaction.data.access',
                value: '0/0/2/7',
              },
              {
                key: 'interaction.data.ag',
                value: '0/0/0/0',
              },
              {
                key: 'interaction.data.shareAG',
                value: '0%',
              },
              {
                key: 'interaction.data.last-af',
                value: 'n/a',
              },
              {
                key: 'interaction.data.visit-length',
                value: '69 min',
              },
            ],
          },
          contractType: {
            title: 'interaction.data.contract-info',
            content: [
              {
                key: 'interaction.data.membership',
                value: '2021-01-30 (26)',
              },
              {
                key: 'interaction.data.subscription-type',
                value: '24$ / Month',
              },
              {
                key: 'interaction.data.schedule',
                value: '07:00 - 17:00',
              },
              {
                key: 'interaction.data.additional-services',
                value: 'n/a',
              },
            ],
          },
          additionalInfo: {
            title: 'interaction.data.additional-info',
            icons: [
              'ic-1_1',
              'ic-1_2',
              'ic-1_3',
              'ic-1_4',
              'ic-1_5',
              'ic-2_1',
              'ic-3_1',
              'ic-3_2',
              'ic-3_3',
              'ic-3_4',
              'ic-4_1',
              'ic-4_2',
              'ic-4_3',
              'ic-4_4',
              'ic-4_5',
            ],
            lifeCycle: {
              key: 'interaction.data.lifecycle',
              progress: 75,
              topLabels: [
                {
                  label: '0',
                  position: 0,
                },
                {
                  label: '45',
                  position: 25,
                },
                {
                  label: '90',
                  position: 50,
                },
                {
                  label: '135',
                  position: 75,
                },
                {
                  label: '180',
                  position: 95,
                },
              ],
              bottomLabels: [
                {
                  label: 'ONB1',
                  position: 0,
                },
                {
                  label: 'REP1',
                  position: 25,
                },
                {
                  label: 'REP2',
                  position: 50,
                },
                {
                  label: 'AUT1',
                  position: 75,
                },
                {
                  label: 'AUT2',
                  position: 95,
                },
              ],
            },
          },
          observation: '',
        },
      },
    ] as Array<ICIData>;

    // return iciData;
    // .sort((a: any, b: any) =>
    // a.date < b.date ? 1 : b.date < a.date ? -1 : 0
    // )
    // Remove duplicates by id
    // .filter(
    //   (value, index, self) =>
    //     index === self.findIndex(e => e.userId === value.userId)
    // )
  }
}
