import { makeAutoObservable } from 'mobx';

import SignInModel from './Model';

import { Status } from 'src/networking/Networker';

class SignInViewModel {
  email = '';
  password = '';
  signInModel: SignInModel;

  constructor(signInModel: SignInModel) {
    this.signInModel = signInModel;
    makeAutoObservable(this, { signInModel: false });
  }

  get success(): boolean {
    return this.signInModel.status === Status.SUCCESS;
  }

  get previousUrl(): string {
    return this.signInModel.previousUrl;
  }

  setEmail = (value: string): void => {
    this.email = value;
  };

  setPassword = (value: string): void => {
    this.password = value;
  };

  authenticate = (): void => {
    this.signInModel.authenticate(this.email, this.password);
  };
}

export default SignInViewModel;
