import { ABSmartStore } from './abSmartStore';
import { AppraisalStore } from './appraisalStore';
import { OfferStore } from './offerStore';
import { PaymentStore } from './paymentStore';
import { StepperStore } from './stepperStore';
import { VerificationStore } from './verificationStore';

import { DirectDepositStore } from 'src/modules/directdeposit/store';
import { OptionsStore } from 'src/modules/options/store';

export default class Store {
  absmart = new ABSmartStore();
  verification = new VerificationStore();
  offer = new OfferStore();
  stepper = new StepperStore();
  payment = new PaymentStore();
  option = new OptionsStore();
  deposit = new DirectDepositStore();
  appraisal = new AppraisalStore();
}
