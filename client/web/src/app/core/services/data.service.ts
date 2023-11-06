import { Injectable } from '@angular/core';
import { INTERACTION } from '../constants/status.constants';
import {
  ICIData,
  ICIFilter,
  ICI_STATUS,
  ICI_TYPE,
  ICIIcons,
} from '../interfaces/icidata.model';
import { IITypeData } from '../interfaces/interaction.model';
import { MenuData } from '../interfaces/menu.model';
import { PEdata, PromptType } from '../interfaces/pedata.model';
import { C_STATUS, Customer } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data!: Array<ICIData>;
  interactionList!: Array<IITypeData>;
  reportMenuItems!: Array<MenuData>;
  userMenuItems!: Array<MenuData>;
  menuItems!: Array<MenuData>;
  originList!: Array<any>;
  selectedOrigin!: number;

  icons: Array<ICIIcons> = [
    { id: 'ic-1_1', icon: '../assets/icons/interaction/1_1.svg' },
    { id: 'ic-1_2', icon: '../assets/icons/interaction/1_2.svg' },
    { id: 'ic-1_3', icon: '../assets/icons/interaction/1_3.svg' },
    { id: 'ic-1_4', icon: '../assets/icons/interaction/1_4.svg' },
    { id: 'ic-1_5', icon: '../assets/icons/interaction/1_5.svg' },
    { id: 'ic-2_1', icon: '../assets/icons/interaction/2_1.svg' },
    { id: 'ic-3_1', icon: '../assets/icons/interaction/3_1.svg' },
    { id: 'ic-3_2', icon: '../assets/icons/interaction/3_2.svg' },
    { id: 'ic-3_3', icon: '../assets/icons/interaction/3_3.svg' },
    { id: 'ic-3_4', icon: '../assets/icons/interaction/3_4.svg' },
    { id: 'ic-4_1', icon: '../assets/icons/interaction/4_1.svg' },
    { id: 'ic-4_2', icon: '../assets/icons/interaction/4_2.svg' },
    { id: 'ic-4_3', icon: '../assets/icons/interaction/4_3.svg' },
    { id: 'ic-4_4', icon: '../assets/icons/interaction/4_4.svg' },
    { id: 'ic-4_5', icon: '../assets/icons/interaction/4_5.svg' },
  ];

  constructor() {
    this.data = this.getDummyData();
    this.interactionList = this.getDummyInteractionData();
    this.userMenuItems = this.getDummyUserMenuData();
    this.reportMenuItems = this.getDummyReportMenuData();
    this.menuItems = this.getDummyMenuData();
    this.originList = this.getDummyOriginData();
    this.selectedOrigin = this.originList[0].id;
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
    this.data[index].status = ICI_STATUS.COMPLETED;
  }

  updateObservation(newState: string, id: string) {
    const index = this.data.findIndex((el) => el.userId === id);
    if (index === -1) {
      return;
    }

    this.data[index].customerInfo.observation = newState;
  }

  getCustomer(id: string): Promise<ICIData> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const cIndex = this.data.findIndex((value, index, self) => {
          return value.userId === id;
        });

        if (cIndex === -1) {
          reject();
          return;
        }

        resolve(this.data[cIndex]);
      }, 400);
    });
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

  getDummyOriginData() {
    return [
      { id: 1, name: 'Solinca Gaia' },
      { id: 2, name: 'Solinca Dragão' },
      { id: 3, name: 'Solinca Porto' },
    ];
  }

  getDummyMenuData() {
    return [
      //TODO: refactor menu options get from service
      {
        title: 'menu.items.interaction.title',
        icon: 'people',

        disabled: false,
        subMenu: [
          {
            title: 'menu.items.interaction.live-club',
            url: '/platform/interaction',
            icon: 'square-outline',
            disabled: false,
          },
          {
            title: 'menu.items.interaction.data-report',
            url: '/platform/report',
            icon: 'podium-outline',
            disabled: true,
          },
          // {
          //   title: 'menu.items.interaction.customer',
          //   url: '/platform/customer',
          //   icon: 'person-add-outline',
          //   disabled: false,
          // },
        ],
      },
      {
        title: 'menu.items.health.title',
        url: '/platform',
        icon: 'medkit',
        disabled: false,
        subMenu: [
          {
            title: 'menu.items.interaction.pe',
            url: '/platform/pe',
            icon: 'scale-outline',
            disabled: false,
          },
        ],
      },
      {
        title: 'menu.items.training.title',
        url: '/user/profile',
        icon: 'barbell',
        disabled: false,
      },
      {
        title: 'menu.items.feed.title',
        url: '/user/profile',
        icon: 'logo-rss',
        disabled: false,
      },
    ];
  }

  getDummyUserMenuData() {
    return [
      //TODO: refactor menu options get from service
      {
        title: 'user.user-menu.menu-items.edit-profile',
        icon: 'pencil',
        route: '/platform/user/profile',
        disabled: false,
      },
      {
        title: 'user.user-menu.menu-items.activity',
        icon: 'calendar',
        route: '/platform/user/activity',
        disabled: true,
      },
      {
        title: 'user.user-menu.menu-items.customers',
        icon: 'people',
        route: '/platform/user/customer',
        disabled: true,
      },
      {
        title: 'user.user-menu.menu-items.notifications',
        icon: 'notifications',
        route: '/platform/user/notification',
        disabled: false,
      },
    ];
  }
  getDummyReportMenuData() {
    return [
      //TODO: refactor menu options get from service
      {
        title: 'user.report-menu.menu-items.usage',
        icon: 'analytics',
        url: 'https://www.youtube.com/embed/xvFZjo5PgG0',
        active: true,
        disabled: false,
      },
      {
        title: 'user.report-menu.menu-items.survey',
        icon: 'star',
        url: 'https://www.africau.edu/images/default/sample.pdf',
        active: false,
        disabled: false,
      },
      {
        title: 'user.report-menu.menu-items.status',
        icon: 'id-card',
        url: 'https://web.seeplus.inovretail.com/application/br/BR_ANALYSIS_CARTEIRA_RPT_001',
        active: false,
        disabled: false,
      },
    ];
  }

  getDummyInteractionData() {
    return [
      {
        label: 'interaction.tabs.interaction.type.types.unplanned',
        value: 'unplanned',
        interaction: [
          {
            label: 'interaction.tabs.interaction.label.types.next_visit',
            value: INTERACTION.NEXT_VISIT,
          },
          {
            label: 'interaction.tabs.interaction.label.types.group_class',
            value: INTERACTION.GROUP_CLASS,
          },
          {
            label: 'interaction.tabs.interaction.label.types.execution_support',
            value: INTERACTION.EXECUTION_SUPPORT,
          },
          {
            label: 'interaction.tabs.interaction.label.types.monthly_challenge',
            value: INTERACTION.MONTHLY_CHALLENGE,
          },
          {
            label: 'interaction.tabs.interaction.label.types.reprogramming',
            value: INTERACTION.REPROGRAMMING,
          },
        ],
      },
    ];
  }
  getLiveClubDummyList(): Array<Customer> {
    return [
      {
        id: '1',
        code: '',
        name: 'Abby Cannon',
        photo: 'assets/temp_images/userPhotos/profile_female6.jpg',
        frequency: 'n/a',
        risk: 'Moderate',
        currentLocation: {
          inClub: true,
          inExerciseRoom: true,
        },
        interaction: {
          id: '1',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'First Day',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '2',
        code: '',
        name: 'Ismail Sykes',
        photo: 'assets/temp_images/userPhotos/profile_male4.jpg',
        frequency: 'n/a',
        risk: 'n/a',
        currentLocation: {
          inClub: false,
          inExerciseRoom: false,
        },
        interaction: {
          id: '2',
          status: C_STATUS.COMPLETED,
          date: '2023-04-02',
          description: [
            {
              lang: 'en-EN',
              text: 'First Week - +3 visits',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '3',
        code: '',
        name: 'Rupert Horton',
        photo: 'assets/temp_images/userPhotos/profile_male3.jpg',
        frequency: 'Active',
        risk: '11%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: false,
        },
        interaction: {
          id: '3',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'Usage Very Active -> Active',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '4',
        code: '',
        name: 'Sanaa Tyler',
        photo: 'assets/temp_images/userPhotos/profile_female5.jpg',
        frequency: 'Active',
        risk: '9%',
        currentLocation: {
          inClub: false,
          inExerciseRoom: false,
        },
        interaction: {
          id: '4',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'NPS Promoter',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '5',
        code: '',
        name: 'Alan Rivers',
        photo: 'assets/temp_images/userPhotos/profile_male2.jpg',
        frequency: 'Very Active',
        risk: '5%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: false,
        },
        interaction: {
          id: '5',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'Cycle Completed',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '6',
        code: '',
        name: 'Helena Saunders',
        photo: 'assets/temp_images/userPhotos/profile_female4.jpg',
        frequency: 'Active',
        risk: '9%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: false,
        },
        interaction: {
          id: '6',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'Cycle 75% Under',
            },
          ],
          callBlock: false,
        },
        healthRisk: false,
      },
      {
        id: '7',
        code: '',
        name: 'Elle Lawrence',
        photo: 'assets/temp_images/userPhotos/profile_male8.jpg',
        frequency: 'n/a',
        risk: 'Low',
        currentLocation: {
          inClub: true,
          inExerciseRoom: false,
        },
        interaction: {
          id: '7',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'First 4-weeks, under 2x week',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '8',
        code: '',
        name: 'Josh Wolf',
        photo: 'assets/temp_images/userPhotos/profile_male6.jpg',
        frequency: 'Asleep',
        risk: '33%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: false,
        },
        interaction: {
          id: '8',
          status: C_STATUS.COMPLETED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'New training plan',
            },
          ],
          callBlock: true,
        },
        healthRisk: false,
      },
      {
        id: '9',
        code: '',
        name: 'Lori Cabrera',
        photo: 'assets/temp_images/userPhotos/profile_female1.jpg',
        frequency: 'Asleep',
        risk: '29%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: true,
        },
        interaction: {
          id: '9',
          status: C_STATUS.COMPLETED,
          date: '2023-04-03',
          description: [
            {
              lang: 'en-EN',
              text: 'Email - PT Offer',
            },
          ],
          callBlock: false,
        },
        healthRisk: false,
      },
      {
        id: '10',
        code: '',
        name: 'Jana Miller',
        photo: 'assets/temp_images/userPhotos/profile_female2.jpg',
        frequency: 'Moderate',
        risk: '26%',
        currentLocation: {
          inClub: true,
          inExerciseRoom: true,
        },
        interaction: {
          id: '10',
          status: C_STATUS.PLANNED,
          date: '2023-04-13',
          description: [
            {
              lang: 'en-EN',
              text: 'Churn Risk Increase',
            },
          ],
          callBlock: true,
        },
        healthRisk: true,
      },
    ];
  }

  getDummyData(): Array<ICIData> {
    return [
      {
        title: 'Abby Cannon',
        userId: 'N#7187',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-13',
        interaction: {
          label: 'INTERACTION:',
          value: 'First Day',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: 'Moderate',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female6.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_1', 'ic-2_1'],
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
        title: 'Laura Ashley',
        userId: 'N#4565',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: false,

        date: '2023-04-13',
        interaction: {
          label: 'INTERACTION:',
          value: 'Second Visit',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: '10',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female3.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '22 April | 23 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'lauraashley@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-4_2', 'ic-1_5', 'ic-1_1'],
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
        title: 'Ismail Sykes',
        userId: 'N#7705',
        status: ICI_STATUS.COMPLETED,
        inClub: false,
        excludeAG: true,

        date: '2023-04-02',
        interaction: {
          label: 'INTERACTION:',
          value: 'First Week - +3 visits',
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
        imageUrl: 'assets/temp_images/userPhotos/profile_male4.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '22 April | 23 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'sykes@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_5', 'ic-4_1', 'ic-3_1', 'ic-4_2', 'ic-4_3', 'ic-4_4'],
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
        title: 'Edmund Jacobson',
        userId: 'N#8629',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2024-04-13',
        interaction: {
          label: 'INTERACTION:',
          value: 'First 2-weeks, 1 visit',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: 'Low',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male1.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          "Edmund Jacobson started his membership on 2023-03-09, but only visit one time in the first 2 weeks. It's important to sensibilize the customer regarding the importance of the onboarding, namely by the definition of a weekly schedule of workouts (at least twice a week)",
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '22 June | 29 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_5', 'ic-4_1', 'ic-3_1'],
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
        title: 'Elle Lawrence',
        userId: 'N#4929',
        status: ICI_STATUS.PLANNED,
        inClub: false,
        excludeAG: true,

        date: '2024-04-13',
        interaction: {
          label: 'INTERACTION:',
          value: 'First 4-weeks, under 2x week',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: 'Low',
          color: '#000000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'n/a',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male8.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          "Edmund Jacobson started his membership on 2023-03-09, but only visit one time in the first 2 weeks. It's important to sensibilize the customer regarding the importance of the onboarding, namely by the definition of a weekly schedule of workouts (at least twice a week)",
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '21 March | 28 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Tim Shepard',
        userId: 'N#9027',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2024-04-13',
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
          value: 'Low',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male5.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '12 August | 33 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_4', 'ic-3_1', 'ic-4_1'],
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
        title: 'Josh Wolf',
        userId: 'N#3701',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: true,

        date: '2023-09-29',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'New training plan',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '33%',
          color: '#FF0000',
        },
        secondary: {
          label: 'USAGE:',
          value: 'Asleep',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male6.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '17 May | 21 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Lori Cabrera',
        userId: 'N#4008',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-03',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Email - PT Offer',
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
          value: 'Asleep',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female1.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '29 January | 28 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_5'],
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
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-13',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Medium Churn Risk',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '28%',
          color: '#FFA500',
        },
        secondary: {
          label: 'USAGE:',
          value: 'Low',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male1.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '5 April | 61 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_5', 'ic-4_1', 'ic-3_1'],
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
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2023-04-13',
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
          value: 'Moderate',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female2.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          'Jana Miller had an increase of risk in 8pp in the last 14 days (currently at 26%). As this is generated by an algorithm, check the customer tab for deep-diving purposes',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '28 September | 26 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Norma Rollins',
        userId: 'N#1394',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: false,

        date: '2023-04-07',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'SMS - New Group Class',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '25%',
          color: '#FFA500',
        },
        secondary: {
          label: 'USAGE:',
          value: 'Moderate',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female8.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          'Jana Miller had an increase of risk in 8pp in the last 14 days (currently at 26%). As this is generated by an algorithm, check the customer tab for deep-diving purposes',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '03 April | 27 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-4_1', 'ic-3_3', 'ic-2_1'],
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
        title: 'Alice Williamson',
        userId: 'N#4812',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2023-04-13',
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
          value: 'Moderate',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female3.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '2 January | 23 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-3_2', 'ic-1_5', 'ic-2_1'],
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
        title: 'Phillip Ponce',
        userId: 'N#674',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: true,

        date: '2023-03-15',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Planned Next Visit',
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
          value: 'Moderate',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male4.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '17 April | 43 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.t@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Sarah Holloway',
        userId: 'N#3929',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-13',
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
          value: 'Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female1.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          'Sarah Holloway grade our service 5 (1-10 scale), which puts her as a detractor. Related to gym floor satisfaction, the evaluation is 8.',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '22 August | 36 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Marion Brewer',
        userId: 'N#914',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-05',
        interaction: {
          label: 'INTERACTION:',
          value: 'Monthly Challenge',
          color: '#000000',
          isBold: true,
        },
        primary: {
          label: 'RISK:',
          value: '17%',
          color: '#cccc00',
        },
        secondary: {
          label: 'USAGE:',
          value: 'Moderate',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female7.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
        interactionInfo:
          'Sarah Holloway grade our service 5 (1-10 scale), which puts her as a detractor. Related to gym floor satisfaction, the evaluation is 8.',
        customerInfo: {
          customerRecord: {
            title: 'interaction.data.customer-info',
            content: [
              {
                key: 'interaction.data.birth-date',
                value: '9 April | 41 years old',
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-13',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Usage Very Active -> Active',
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
          value: 'Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male3.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Rebecca Mcleod',
        userId: 'N#994',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: true,
        date: '2023-04-08',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'Email - 100 visits ',
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
          value: 'Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male6.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2023-04-13',
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
          value: 'Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female4.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Sanaa Tyler',
        userId: 'N#5653',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: false,

        date: '2023-02-28',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'NPS Promoter',
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
          value: 'Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_female5.jpg',
        interactionInfo: '',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Alan Rivers',
        userId: 'N#3203',
        status: ICI_STATUS.PLANNED,
        inClub: true,
        excludeAG: true,

        date: '2023-04-13',
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
          value: 'Very Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male2.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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
        title: 'Alan Rivers',
        userId: 'N#3203',
        status: ICI_STATUS.COMPLETED,
        inClub: true,
        excludeAG: false,

        date: '2023-04-05',
        interaction: {
          label: 'LAST INTERACTION:',
          value: 'High Motivation',
          color: '#000000',
          isBold: !true,
        },
        primary: {
          label: 'RISK:',
          value: '7%',
          color: '#00FF00',
        },
        secondary: {
          label: 'USAGE:',
          value: 'Very Active',
          color: '#000000',
        },
        imageUrl: 'assets/temp_images/userPhotos/profile_male7.jpg',
        historyInfo: [
          {
            id: '1',
            date: '2023-04-20T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Low Motivation',
            description:
              'A new training plan to improve the customer motivation was provided.',
          },
          {
            id: '2',
            date: '2023-04-21T14:31:33.456Z',
            status: ICI_STATUS.COMPLETED,
            type: ICI_TYPE.NPS,
            highlight: true,
            title: 'NPS Promoter',
            description: 'No comment to display.',
          },
          {
            id: '3',
            date: '2023-04-28T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Cycle Not-Completed',
            description:
              'The customer was on vacation for 2 weeks in October; should maintain consistency of usage from now on.',
          },
          {
            id: '1',
            date: '2023-04-29T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.SMS,
            title: 'Inactive for 14 days',
            description:
              "Hello! We noticed you haven't come to train in a few days. We know there are difficult weeks but it's essential to keep going! Don't waste your progress! We count on you!",
          },
          {
            id: '1',
            date: '2023-07-02T14:31:33.456Z',
            status: ICI_STATUS.PLANNED,
            type: ICI_TYPE.IN_CLUB,
            title: 'Medium Motivation',
            description:
              'A new training plan was provided, member seemed thrilled.',
          },
        ],
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
          customerContact: {
            title: 'interaction.data.personal-info',
            content: [
              {
                key: 'interaction.data.email',
                value: 'teste.teste@gmail.com',
              },
              {
                key: 'interaction.data.phone',
                value: '+00 95554-2046',
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
            icons: ['ic-1_2', 'ic-2_1', 'ic-3_1'],
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

  getDummyPEData(): Array<PEdata> {
    return [
      {
        // step 1
        id: '1',
        steps: [
          {
            number: '1',
            title: 'Análise Comportamental',
            group: [
              {
                title: '1. Nível de actividade e experiência em Ginásio',
                prompts: [
                  {
                    title:
                      'Actualmente, realiza actividade física estruturada, planeada, 3 dias por semana, durante pelo menos 30 minutos, a uma intensidade moderada pelo menos há 3 meses?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '1',
                          label: 'Sim',
                        },
                        {
                          id: '2',
                          label: 'Não',
                        },
                        {
                          id: '3',
                          label: 'Sem resposta',
                        },
                      ],
                    },
                  },
                  {
                    title: 'É a primeira vez que frequenta um ginásio?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '4',
                          label: 'Sim',
                        },
                        {
                          id: '5',
                          label: 'Não',
                        },
                        {
                          id: '6',
                          label: 'Sem resposta',
                        },
                      ],
                    },
                  },
                  {
                    title:
                      'Caso tenha frequentado, quantos ginásios frequentou nos últimos 2 anos?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '7',
                          label: '1',
                        },
                        {
                          id: '8',
                          label: '2 ou mais',
                        },
                        { id: '9', label: 'Sem resposta' },
                      ],
                    },
                  },
                ],
              },
              {
                title: '2. Qual o seu objetivo?',
                prompts: [
                  {
                    title: 'Foco do treino ',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '10',
                          label: 'Tonificar',
                        },
                        {
                          id: '11',
                          label: 'Definir',
                        },
                        {
                          id: '12',
                          label: 'Nenhum',
                        },
                      ],
                      placeholder: 'Selecione',
                    },
                  },
                  {
                    title: 'Que zona do corpo? ',
                    type: PromptType.Checkbox,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '13',
                          label: 'Pernas',
                        },
                        {
                          id: '14',
                          label: 'Coxas',
                        },
                        {
                          id: '15',
                          label: 'Glúteos',
                        },
                        {
                          id: '16',
                          label: 'Braços',
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title: '3. No contexto de exercício físico...',
                prompts: [
                  {
                    title: 'O que gosta mais de fazer?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '17',
                          label: 'Cardio',
                        },
                        {
                          id: '18',
                          label: 'Musculação',
                        },
                        {
                          id: '19',
                          label: 'Sem resposta',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          // step 2
          {
            number: '2',
            title: 'Análise Técnica',
            group: [
              {
                title: '1. Anamnese Médica',
                prompts: [
                  {
                    title: 'Alguma lesão antiga?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '20', label: 'Sim' },
                        { id: '21', label: 'Não' },
                      ],
                    },
                  },
                  {
                    // title: 'História Pessoal - Comorbidades',
                    title: 'Doença Cardíaca',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '22', label: 'Angina Instável' },
                        { id: '23', label: 'Insuficiencia Cardiaca' },
                        { id: '24', label: 'Doença Valvula' },
                        { id: '25', label: 'Doença Vascular' },
                        { id: '26', label: 'AVC' },
                        { id: '27', label: 'Outro' },
                        { id: '28', label: 'Nenhuma' },
                      ],
                      placeholder: 'Selecione',
                    },
                  },
                  {
                    title: 'Doença Pulmonar',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '29', label: 'Asma' },
                        { id: '30', label: 'Bronquite' },
                        {
                          id: '31',
                          label: 'Doença Pulmonar Obstrutiva Crónica',
                        },
                        { id: '32', label: 'Enfisema Pulmonar' },
                        { id: '33', label: 'AVC' },
                        { id: '34', label: 'Outro' },
                        { id: '35', label: 'Nenhuma' },
                      ],
                      placeholder: 'Selecione',
                    },
                  },
                  {
                    title: 'Doença Renal',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '36', label: 'Insuficiência Renal' },
                        { id: '37', label: 'Pedra nos Rins' },
                        { id: '38', label: 'Infecção Renal' },
                        { id: '39', label: 'Cistos Renais' },
                        { id: '40', label: 'Outro' },
                        { id: '41', label: 'Nenhuma' },
                      ],
                      placeholder: 'Selecione',
                    },
                  },
                  {
                    title: 'Cancro',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '42', label: 'Mama' },
                        { id: '43', label: 'Colon-Rectal' },
                        { id: '44', label: 'Próstata' },
                        { id: '45', label: 'Pulmão' },
                        { id: '46', label: 'Estômago' },
                        { id: '47', label: 'Outro' },
                        { id: '48', label: 'Nenhum' },
                      ],
                      placeholder: 'Selecione',
                    },
                  },
                  {
                    title:
                      'Sinais ou Sintomas de Doença Cardiovascular, Metabólica e Renal',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '49',
                          label:
                            'Dor ou desconforto no peito, pescoço ou braços, resultantes de possível isquemia do miocárdio',
                        },
                        {
                          id: '50',
                          label:
                            'Dificuldades respiratórias em repouso ou em esforço leve',
                        },
                        {
                          id: '51',
                          label: 'Nenhum',
                        },
                      ],
                      placeholder: 'Selecione',
                    },
                  },

                  {
                    title: 'Factores de Risco Cardiovascular - negativos',
                    type: PromptType.Select,
                    validations: [
                      {
                        name: 'required',
                        value: false,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '52', label: 'Colesterol' },
                        { id: '53', label: 'Nenhum' },
                        // Observação Input??
                      ],
                      placeholder: 'Selecione',
                    },
                  },

                  {
                    title: 'Está a tomar alguma medicação?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        { id: '54', label: 'Sim' },
                        { id: '55', label: 'Não' },
                      ],
                    },
                  },
                ],
              },
              {
                title: '2. Covid 19',
                prompts: [
                  {
                    title: 'Teve Covid 19?',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '56',
                          label: 'Sim',
                        },
                        {
                          id: '57',
                          label: 'Não',
                        },
                      ],
                    },
                  },
                ],
              },
              {
                title:
                  '3. Estratificação de Risco, Intensidade e Progressão de treino recomendada',
                prompts: [
                  {
                    title:
                      'Apresenta um Baixo Risco de doença cardiovascular (Indivíduos assintomáticos e que não tenham mais do que um factor de risco.)',
                    type: PromptType.Radio,
                    validations: [
                      {
                        name: 'required',
                        value: true,
                      },
                    ],
                    prompt: {
                      options: [
                        {
                          id: '58',
                          label: 'Sim',
                        },
                        {
                          id: '59',
                          label: 'Não',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          // step 3
          {
            number: '3',
            title: 'Análise Física',
            group: [
              {
                title: '1. Medidas',
                prompts: [
                  {
                    title: 'Altura',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-9]',
                      },
                    ],
                    prompt: { label: 'Altura (cm)', placeholder: 'cm' },
                  },
                  {
                    title: 'Peso',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-9]',
                      },
                    ],
                    prompt: { label: 'Peso (Kg)', placeholder: 'Kg' },
                  },
                  {
                    title: '% Massa Gorda',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-9]',
                      },
                    ],
                    prompt: { label: 'M.G. (%)', placeholder: '% M.G' },
                  },
                  {
                    title: '% Massa Magra',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-9]',
                      },
                    ],
                    prompt: { label: 'M.M. (%)', placeholder: '% M.M' },
                  },
                  {
                    title: 'Gordura Visceral',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-9]',
                      },
                    ],
                    prompt: { label: 'G.V. (%)', placeholder: '1-59' },
                  },
                  {
                    title: 'Taxa Metabólica Basal',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-90-9.0-9]',
                      },
                    ],
                    prompt: { label: 'T.M.B. (%)', placeholder: '%' },
                  },
                  {
                    title: 'Perímetro Anca:',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-90-9.0-9]',
                      },
                    ],
                    prompt: { label: 'Anca (cm)', placeholder: 'cm' },
                  },
                  {
                    title: 'Índice Anca / Cintura:',
                    type: PromptType.Input,
                    validations: [
                      {
                        name: 'pattern',
                        value: '[0-90-90-9.0-9]',
                      },
                    ],
                    prompt: {
                      label: 'Índice Anca / Cintura:',
                      placeholder: 'Anca (cm) / Cintura (cm)',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}
