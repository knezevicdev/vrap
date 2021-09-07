import { ABSmartStore } from './abSmartStore';
import { OfferStore } from './offerStore';
import { VerificationStore } from './verificationStore';

export default class Store {
  absmart = new ABSmartStore();
  verification = new VerificationStore();
  offer = new OfferStore();
}
