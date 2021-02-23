import SignupModel, { Fields } from './Model';

import { Status } from 'src/networking/Networker';

class SignupViewModel {
  model: SignupModel;

  constructor(model: SignupModel) {
    this.model = model;
  }

  handleChange = (
    field: Fields,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.model.change(field, e.target.value);
  };

  handleSubmit = (): void => {
    this.model.submit();
  };

  get validation(): {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
  } {
    const firstName = this.model.firstName.length > 0;
    const lastName = this.model.lastName.length > 0;
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const email = emailRegex.test(this.model.email);

    const passwordCheck = (value: string): boolean => {
      const lenCheck = value.length >= 8;
      const numericCheck = new RegExp(/\d/).test(value);
      const upperCaseCheck = new RegExp(/[A-Z]/).test(value);
      const lowerCaseCheck = new RegExp(/[a-z]/).test(value);

      return lenCheck && numericCheck && upperCaseCheck && lowerCaseCheck;
    };

    const password = passwordCheck(this.model.password);
    const passwordConfirm =
      passwordCheck(this.model.passwordConfirm) &&
      this.model.password === this.model.passwordConfirm;

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    };
  }

  value(field: Fields): string {
    return this.model[field];
  }

  get disabled(): boolean {
    return Object.values(this.validation).includes(false) || this.loading;
  }

  get loading(): boolean {
    return this.model.status === Status.FETCHING;
  }

  get success(): boolean {
    return this.model.status === Status.SUCCESS;
  }

  get error(): string {
    if (this.model.status === Status.ERROR) {
      return this.model.errorMessage;
    } else {
      return '';
    }
  }

  clearError(): void {
    this.model.setErrorMessage('');
  }
}

export default SignupViewModel;
