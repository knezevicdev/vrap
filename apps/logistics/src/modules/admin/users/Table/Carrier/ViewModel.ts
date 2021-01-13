import AutocompleteModel from './Model';

import UsersModel from 'src/modules/admin/users/Model';
import { Carrier } from 'src/networking/models/User';
import { Status } from 'src/networking/Networker';

class AutocompleteViewModel {
  private model: AutocompleteModel;
  private usersModel: UsersModel;

  constructor(autocompleteModel: AutocompleteModel, usersModel: UsersModel) {
    this.model = autocompleteModel;
    this.usersModel = usersModel;
  }

  get value(): Carrier | undefined {
    return this.model.value;
  }

  get carrierName(): string {
    return this.model.carrierName;
  }

  setValue(value: Carrier | undefined): void {
    this.model.setValue(value);
    if (value) {
      this.usersModel.patchUser(
        this.model.userId,
        undefined,
        value.carrier_code
      );
    }
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
}

export default AutocompleteViewModel;
