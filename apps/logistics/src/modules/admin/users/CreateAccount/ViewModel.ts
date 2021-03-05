import { makeAutoObservable } from 'mobx';

import UsersModel from 'src/modules/admin/users/Model';

class CreateAccountViewModel {
  private usersModel: UsersModel;
  private _email = '';

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel;
    makeAutoObservable<this, 'usersModel'>(this, { usersModel: false });
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get disabled(): boolean {
    const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return !emailRegex.test(this.email);
  }

  createAccount(): void {
    this.usersModel.postCreateAccount(this.email);
  }
}

export default CreateAccountViewModel;
