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
}

export default SignupViewModel;
