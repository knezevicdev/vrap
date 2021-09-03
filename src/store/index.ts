import { ABSmartStore } from './abSmartStore';
import { VerificationStore } from './verificationStore';

export default class Store {
  absmart = new ABSmartStore();
  verification = new VerificationStore();
}
