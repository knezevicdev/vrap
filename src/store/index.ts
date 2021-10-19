import { ABSmartStore } from './abSmartStore';
import { OfferStore } from './offerStore';
import { PaymentStore } from './paymentStore';
import { StepperStore } from './stepperStore';
import { VerificationStore } from './verificationStore';

import { OptionsStore } from 'src/modules/options/store';

export default class Store {
  absmart = new ABSmartStore();
  verification = new VerificationStore();
  offer = new OfferStore();
  stepper = new StepperStore();
  payment = new PaymentStore();
  option = new OptionsStore();
}
