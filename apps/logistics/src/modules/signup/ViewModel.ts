import { makeAutoObservable } from 'mobx';

import SignupModel from './Model';

import { postSignUp } from 'src/networking/Networker';

class SignupViewModel {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';

  model: SignupModel;

  constructor(model: SignupModel) {
    makeAutoObservable(this);
    this.model = model;
  }

  changeFirst = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.firstName = e.target.value;
  };

  changeLast = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.lastName = e.target.value;
  };

  changeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.email = e.target.value;
  };

  changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.password = e.target.value;
  };

  changePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.passwordConfirm = e.target.value;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    postSignUp(this.email, this.password, this.firstName, this.lastName);
  };

  get disabled(): boolean {
    if (this.firstName.length === 0) {
      return true;
    }

    if (this.lastName.length === 0) {
      return true;
    }

    // from https://emailregex.com/
    const emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!emailRegex.test(this.email)) {
      return true;
    }

    const passwordRegex = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/
    );
    if (
      !(
        passwordRegex.test(this.password) &&
        passwordRegex.test(this.passwordConfirm) &&
        this.password === this.passwordConfirm
      )
    ) {
      return true;
    }
    return false;
  }
}

export default SignupViewModel;
