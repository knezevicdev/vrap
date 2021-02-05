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
