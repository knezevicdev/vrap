import debounce from 'lodash.debounce';
import { makeAutoObservable, runInAction } from 'mobx';

import { Carrier } from 'src/networking/models/User';
import { getCarriers, Status } from 'src/networking/Networker';

class AutocompleteModel {
  private INPUT_DEBOUNCE_WAIT = 400; // milliseconds
  userId: number;
  carrierName: string;

  inputValue = '';
  options: Carrier[] = [];
  status: Status = Status.INITIAL;
  value?: Carrier;

  constructor(userId: number, carrierName: string) {
    this.userId = userId;
    this.carrierName = carrierName;
    makeAutoObservable<this, 'userId' | 'carrierName' | 'afterSetInputValue'>(
      this,
      {
        afterSetInputValue: false,
        userId: false,
        carrierName: false,
      }
    );
  }

  setInputValue = (value: string): void => {
    this.inputValue = value;
    this.afterSetInputValue(value);
  };

  setValue = (value: Carrier | undefined): void => {
    this.value = value;
  };

  private afterSetInputValue = debounce((value: string) => {
    if (value.length > 0) {
      this.getCarriers(value);
    } else {
      this.clearOptions();
    }
  }, this.INPUT_DEBOUNCE_WAIT);

  clearOptions = (): void => {
    this.options = [];
    this.status = Status.INITIAL;
  };

  getCarriers = async (filter: string): Promise<void> => {
    this.status = Status.FETCHING;

    try {
      const response = await getCarriers(filter);

      runInAction(() => {
        this.status = Status.SUCCESS;
        this.options = response.data;
      });
    } catch (err) {
      console.error(err);

      this.status = Status.ERROR;
    }
  };
}

export default AutocompleteModel;
