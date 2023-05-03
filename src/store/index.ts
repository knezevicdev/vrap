import { AppraisalStore } from './appraisalStore';
import { DealStore } from './dealStore';
import { OfferStore } from './offerStore';
import { PaymentStore } from './paymentStore';
import { VerificationStore } from './verificationStore';

import { DirectDepositStore } from 'src/modules/directdeposit/store';
import { OptionsStore } from 'src/modules/options/store';

export default class Store {
  verification = new VerificationStore();
  offer = new OfferStore();
  payment = new PaymentStore();
  option = new OptionsStore();
  deposit = new DirectDepositStore();
  appraisal = new AppraisalStore();
  deal = new DealStore();
}
