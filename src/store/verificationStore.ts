import { makeAutoObservable } from 'mobx';

export class VerificationStore {
  constructor() {
    makeAutoObservable(this);
  }
}
