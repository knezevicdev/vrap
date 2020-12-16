import { GQLTypes, Status } from '@vroom-web/networking';
import { FooterProps } from 'vroom-ui';

import Model from './Model';
import { NextProps } from './sections/Next';
import { QuestionProps } from './sections/Questions';
import { ReservedCarProps } from './sections/ReservedCar';

export default class CongratsViewModel {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  private get summary(): GQLTypes.DealSummary {
    return (this.model.data.user.deals as Array<GQLTypes.Deal>)[0].dealSummary;
  }

  private get account(): GQLTypes.Account {
    return this.summary.accountInfo as GQLTypes.Account;
  }

  private get inventory(): GQLTypes.Inventory {
    return this.summary.inventory as GQLTypes.Inventory;
  }

  private get vehicle(): GQLTypes.VehicleInventory {
    return this.inventory.vehicle as GQLTypes.VehicleInventory;
  }

  get loading(): boolean {
    return this.model.dataStatus === Status.LOADING;
  }

  get error(): boolean {
    return this.model.dataStatus === Status.ERROR;
  }

  get empty(): boolean {
    if (this.model.dataStatus !== Status.SUCCESS) {
      return false;
    }
    if (!this.model.data.user.deals) {
      return true;
    }
    return this.model.data.user.deals.length === 0;
  }

  get reservedCarProps(): ReservedCarProps {
    const { year, make, model, trim } = this.vehicle;
    const { leadPhotoURL } = this.inventory;
    const car = `${year} ${make} ${model} ${trim}`;
    const src = leadPhotoURL ? leadPhotoURL : '';

    return {
      data: {
        car: car,
        email: this.account.userName,
        phoneNumber: this.account.phone,
        image: {
          alt: car,
          src: src,
        },
      },
    };
  }

  get nextProps(): NextProps {
    return {
      heading: 'what to expect next...',
      steps: [
        {
          number: '1',
          title: 'Finalize Your Purchase',
          description:
            'A Vroom representative will call to discuss terms and finalize your purchase.',
        },
        {
          number: '2',
          title: 'Make It Official',
          description:
            'Vroom will overnight a contract for you to sign and return.',
        },
        {
          number: '3',
          title: 'Home Delivery',
          description: `Get your new ride delivered to your driveway anywhere within the continental U.S.`,
        },
      ],
    };
  }

  get questionsProps(): QuestionProps {
    return {
      phone: {
        href: '+18555241300',
        label: '(855) 524-1300',
      },
    };
  }

  get footerProps(): FooterProps {
    return {
      sections: [
        {
          title: 'Vroom',
          links: [
            {
              href: '/cars',
              name: 'Buy',
            },
            {
              href: '/sell',
              name: 'Sell/Trade',
            },
            {
              href: '/finance',
              name: 'Finance',
            },
          ],
        },
        {
          title: 'About',
          links: [
            {
              href: '/about',
              name: 'About Us',
            },
            {
              href: '/protection',
              name: 'Vroom Protection',
            },
            {
              href: '/how-it-works',
              name: 'How It Works',
            },
            {
              href: '/reviews',
              name: 'Customer Reviews',
            },
            {
              href: 'https://ir.vroom.com/',
              name: 'Investor Relations',
            },
          ],
        },
        {
          title: 'Contact',
          links: [
            {
              href: 'tel:+18555241300',
              name: '(855) 524-1300',
            },
            {
              href: 'https://vroom.zendesk.com/hc/en-us',
              name: 'FAQ',
            },
            {
              href: '/contact',
              name: 'Contact Us',
            },
          ],
        },
        {
          title: 'Company',
          links: [
            {
              href: '/legal/privacy-policy',
              name: 'Privacy Policy',
            },
            {
              href: '/legal/terms-of-use',
              name: 'Terms of use',
            },
            {
              href: '/careers',
              name: 'Careers',
            },
            {
              href:
                'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
              name: 'Do Not Sell My Info (CA Residents)',
            },
          ],
        },
      ],
    };
  }
}
