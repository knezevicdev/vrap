import { makeAutoObservable, runInAction } from 'mobx';

import { postSignUp, Status } from 'src/networking/Networker';

export type Fields =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'password'
  | 'passwordConfirm';

class SignupModel {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';
  status = Status.INITIAL;
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  change = (field: Fields, value: string): void => {
    this[field] = value;
  };

  submit = async (): Promise<void> => {
    this.status = Status.FETCHING;
    this.errorMessage = '';
    try {
      await postSignUp(
        this.email,
        this.password,
        this.firstName,
        this.lastName
      );
      runInAction(() => {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.passwordConfirm = '';
        this.status = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.status = Status.ERROR;
        this.errorMessage =
          err.message ?? 'There was an error with your request';
      });
    }
  };

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}

export default SignupModel;
