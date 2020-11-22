import debounce from 'lodash.debounce';
import { makeAutoObservable, runInAction } from 'mobx';

import { Carrier } from 'src/networking/models/User';
import { getCarriers, Status } from 'src/networking/Networker';

class AutocompleteModel {
  private INPUT_DEBOUNCE_WAIT = 400; // milliseconds
  inputValue = '';
  options: Carrier[] = [];
  status: Status = Status.INITIAL;

  constructor() {
    makeAutoObservable<this, 'afterSetInputValue'>(this, {
      afterSetInputValue: false,
    });
  }

  setInputValue = (value: string): void => {
    console.log('setInputValue', value);
    this.inputValue = value;
    this.afterSetInputValue(value);
  };

  private afterSetInputValue = debounce((value: string) => {
    if (value.length > 0) {
      console.log('afterSetInputValue', value);
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

    console.log('getCarriers', filter);
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
