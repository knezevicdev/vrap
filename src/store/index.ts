import { AppraisalStore } from './appraisalStore';
import { DealStore } from './dealStore';
import { OfferStore } from './offerStore';

export default class Store {
  offer = new OfferStore();
  appraisal = new AppraisalStore();
  deal = new DealStore();
}
