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

  get disabled(): boolean {
    if (this.email.length === 0) {
      return true;
    }
    if (this.password.length === 0) {
      return true;
    }
    if (this.loading) {
      return true;
    }
    return false;
  }

  get loading(): boolean {
    return this.signInModel.status === Status.FETCHING;
  }

  get success(): boolean {
    return this.signInModel.status === Status.SUCCESS;
  }

  get error(): string {
    if (this.signInModel.status === Status.ERROR) {
      return this.signInModel.errorMessage;
    } else {
      return '';
    }
  }

  clearError(): void {
    this.signInModel.setErrorMessage('');
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
