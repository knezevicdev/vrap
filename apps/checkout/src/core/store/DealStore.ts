import { GQLTypes } from '@vroom-web/networking';
import { action, makeObservable, observable } from 'mobx';
import head from 'lodash/head';
export interface DealState {
  activeStep: number;
  showDropdown: boolean;
  model: DealStoreProps | undefined;
}
export interface DealStoreProps {
  data: {
    user: GQLTypes.User;
    invSearch: GQLTypes.InvSearchResult;
  };
}
export class DealStore {
  steps: string[] = [
    'Trade-In Info',
    'Your Info',
    'Payment Details',
    'Finalize Purchase',
    'Deposit',
    'Additional Docs',
  ];
  activeStep = -1;

  showDropdown = false;
  model: DealStoreProps | undefined;

  constructor(model?: DealStoreProps, currentStep?: number) {
    this.model = model;
    this.activeStep = currentStep || -1;

    makeObservable(this, {
      showDropdown: observable,
      toggleDropdown: action,
      model: observable,
      activeStep: observable
    });

  }

  get deal(): GQLTypes.Deal | undefined | null {
    return this.model && head(this.model?.data?.user?.deals);
  }

  get vehicle(): GQLTypes.InvSearchVehicleData | undefined | null {
    return this.model && head(this.model?.data.invSearch?.vehicles);
  }

  toggleDropdown = (): void => {
    this.showDropdown = !this.showDropdown;
  };
}
