import { NoDealErrorText } from './OfferDialog.language';

import { acceptDeal, declineDeal, UpdateDeal } from 'src/networking/request';
import Store from 'src/store';
import { displayCurrency } from 'src/utils';

export const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export const WEEKDAYS = [
  { value: 1, label: 'Sunday' },
  { value: 2, label: 'Monday' },
  { value: 3, label: 'Tuesday' },
  { value: 4, label: 'Wednesday' },
  { value: 5, label: 'Thursday' },
  { value: 6, label: 'Friday' },
  { value: 7, label: 'Saturday' },
];

export default class OfferDialogViewModel {
  constructor(private _store: Store) {}

  get price(): string {
    const price = this._store.offer.offerDetail?.price;

    if (price) return displayCurrency(price);

    return '';
  }

  get expirationDate(): string {
    const expirationDate = this._store.offer.offerDetail?.offerExpiration;

    if (expirationDate) {
      const isoDateTime = new Date(expirationDate);
      const day = WEEKDAYS[isoDateTime.getDay()].label;
      const month = MONTHS[isoDateTime.getMonth()].label;
      const date = isoDateTime.getDate();
      return `${day}, ${month} ${date}`;
    }

    return '';
  }

  get hasValidPrice(): boolean {
    const expirationDate = this._store.offer.offerDetail?.offerExpiration;
    return !!expirationDate && new Date(expirationDate) > new Date();
  }

  handleUpdateDeal(response: UpdateDeal): void {
    if (!response.isError) {
      window.location.href = response.redirect;
      return;
    }

    this._store.appraisal.setReviewError(response.error);
    this._store.offer.setShowOfferDialog(false);
  }

  acceptPrice = async (): Promise<void> => {
    if (!this.hasValidPrice) {
      this.declinePrice();
      return;
    }

    const offer = this._store.offer.offerDetail;
    if (!this._store.deal.deal || !offer) {
      this.showDealError();
      return;
    }

    this._store.deal.setLoading(true);

    const response = await acceptDeal({
      dealID: this._store.deal.deal.dealID,
      appraisalID: offer.id,
      offerID: offer.offerId,
      offerPrice: offer.price,
      vin: offer.vin,
      make: offer.make,
      carModel: offer.model,
      year: offer.year,
      email: this._store.appraisal.personalInfoForm.email,
      offerStatus: offer.offerStatus,
      expirationDate: offer.offerExpiration,
      source: 'web',
    });
    this._store.deal.setLoading(false);

    this.handleUpdateDeal(response);
  };

  declinePrice = async (): Promise<void> => {
    if (!this._store.deal.deal) {
      this.showDealError();
      return;
    }

    this._store.deal.setLoading(true);
    const response = await declineDeal(this._store.deal.deal);
    this._store.deal.setLoading(false);

    this.handleUpdateDeal(response);
  };

  showDealError = (): void => {
    this._store.offer.setShowOfferDialog(false);
    this._store.appraisal.setReviewError(NoDealErrorText);
  };
}
