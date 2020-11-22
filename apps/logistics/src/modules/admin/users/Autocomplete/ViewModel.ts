import UsersModel from '../Model';
import AutocompleteModel from './Model';

import { Carrier } from 'src/networking/models/User';
import { Status } from 'src/networking/Networker';

class AutocompleteViewModel {
  private model: AutocompleteModel;
  private usersModel: UsersModel;

  constructor(autocompleteModel: AutocompleteModel, usersModel: UsersModel) {
    this.model = autocompleteModel;
    this.usersModel = usersModel;
  }

  get inputValue(): string {
    return this.model.inputValue;
  }

  setInputValue(value: string): void {
    this.model.setInputValue(value);
  }

  get loading(): boolean {
    return this.model.status === Status.FETCHING;
  }

  get options(): Carrier[] {
    if (this.loading) {
      return [];
    }
    if (this.model.options.length > 0) {
      return this.model.options;
    }
    return [];
  }

  setCarrierCodeAndFilter(carrierCode: string): void {
    this.usersModel.setCarrierCode(carrierCode);
    this.usersModel.getUsers();
  }
}

export default AutocompleteViewModel;
