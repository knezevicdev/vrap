import InputsStore from './store';

class InputsViewModel {
  private readonly store: InputsStore;
  readonly errorLabel: string =
    'Please enter a mileage less than or equal to 200,000';
  readonly placeholder: string = 'No Maximum';

  constructor(store: InputsStore) {
    this.store = store;
  }

  getValue = (): string => {
    return this.store.value ? this.store.value : '';
  };

  getError = (): boolean => {
    return this.store.error;
  };

  setValue = (value: number): void => {
    this.store.setValue(value);
  };
}

export default InputsViewModel;
