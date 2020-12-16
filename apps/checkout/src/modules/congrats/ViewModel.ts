import { GQLTypes, Status } from '@vroom-web/networking';

import Model from './Model';
import { NextProps } from './sections/Next';
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
}
