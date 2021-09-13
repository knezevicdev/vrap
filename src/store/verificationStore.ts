import { makeAutoObservable } from 'mobx';

import { Verification } from 'src/networking/models/Price';

export class VerificationStore {
  verificationDetail?: Verification;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getVerificationDetail(data: Verification): void {
    console.log('getVerificationDetail data ', data);
    this.verificationDetail = data;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }
}
