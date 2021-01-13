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

  get validation(): {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
  } {
    const firstName = this.firstName.length > 0;
    const lastName = this.lastName.length > 0;
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const email = emailRegex.test(this.email);

    const passwordCheck = (value: string): boolean => {
      const lenCheck = value.length >= 8;
      const numericCheck = new RegExp(/\d/).test(value);
      const upperCaseCheck = new RegExp(/[A-Z]/).test(value);
      const lowerCaseCheck = new RegExp(/[a-z]/).test(value);

      return lenCheck && numericCheck && upperCaseCheck && lowerCaseCheck;
    };

    const password = passwordCheck(this.password);
    const passwordConfirm =
      passwordCheck(this.passwordConfirm) &&
      this.password === this.passwordConfirm;

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
  }

  get disabled(): boolean {
    return Object.values(this.validation).includes(false);
  }
}

export default SignupViewModel;
