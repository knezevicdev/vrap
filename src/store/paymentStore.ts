import { makeAutoObservable } from 'mobx';

import { MailingAddress, PaymentOverviewFormValues } from 'src/interfaces.d';

export class PaymentStore {
  values?: PaymentOverviewFormValues;
  priceId?: string;
  address?: MailingAddress;
  submittedType?: string;

  constructor() {
    makeAutoObservable(this);
  }

  setValues(
    values: PaymentOverviewFormValues,
    priceId: string,
    address: MailingAddress
  ): void {
    this.values = values;
    this.priceId = priceId;
    this.address = address;
  }

  setSubmitType(value: string): void {
    this.submittedType = value;
  }
}
