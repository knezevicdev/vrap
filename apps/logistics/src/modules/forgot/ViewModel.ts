import { makeAutoObservable } from 'mobx';

import ForgotModel from './Model';

import { Status } from 'src/networking/Networker';

class ForgotViewModel {
  email = '';
  model: ForgotModel;

  constructor(model: ForgotModel) {
    this.model = model;
    makeAutoObservable(this, { model: false });
  }
  get disabled(): boolean {
    if (this.email.length === 0) {
      return true;
    }

    if (this.loading) {
      return true;
    }

    return false;
  }

  get error(): string {
    if (this.model.status === Status.ERROR) {
      return this.model.errorMessage;
    } else {
      return '';
    }
  }

  get loading(): boolean {
    return this.model.status === Status.FETCHING;
  }

  get success(): boolean {
    return this.model.status === Status.SUCCESS;
  }

  setEmail = (value: string): void => {
    this.email = value;
  };

  handleSubmit = (): void => {
    this.model.forgotPassword(this.email);
  };
}

export default ForgotViewModel;
