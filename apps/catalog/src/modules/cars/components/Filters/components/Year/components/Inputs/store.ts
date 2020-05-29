import { action, observable } from 'mobx';

class InputsStore {
  @observable values: string[];
  @observable error = false;

  constructor(state: string[] | undefined) {
    this.values = state ? state : ['', ''];
  }

  @action
  setError = (error: boolean): void => {
    this.error = error;
  };

  @action
  setValues = (values: string[]): void => {
    this.values = values;
  };
}

export default InputsStore;
