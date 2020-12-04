import { makeAutoObservable } from 'mobx';

class RegisterModel {
  email = '';

  constructor() {
    makeAutoObservable(this);
    // will autofill email from query string on clicking registration link
  }
}

export default RegisterModel;
