import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';

import BookModel from './Model';
class BookViewModel {
  private _pickupDate = dayjs().format('YYYY-MM-DD');
  private _deliveryDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
  private _shippingCost = '0.00';

  model: BookModel;

  constructor(model: BookModel) {
    this.model = model;
    makeAutoObservable(this, { model: false });
  }

  get pickupDate(): string {
    return this._pickupDate;
  }

  set pickupDate(value: string) {
    const d = dayjs(value).isValid() ? dayjs(value) : dayjs();

    const result = d.isBefore(dayjs())
      ? dayjs().format('YYYY-MM-DD')
      : d.format('YYYY-MM-DD');

    this._pickupDate = result;

    if (
      d.isAfter(dayjs(this._deliveryDate)) ||
      d.isSame(dayjs(this._deliveryDate))
    ) {
      this._deliveryDate = dayjs(value).add(1, 'day').format('YYYY-MM-DD');
    }
  }

  get pickupDateMin(): string {
    return dayjs().format('YYYY-MM-DD');
  }

  get deliveryDate(): string {
    return this._deliveryDate;
  }

  set deliveryDate(value: string) {
    this._deliveryDate =
      dayjs(value).isValid() &&
      dayjs(value).isAfter(dayjs(this.deliveryDateMin))
        ? dayjs(value).format('YYYY-MM-DD')
        : this.deliveryDateMin;
  }

  get deliveryDateMin(): string {
    return dayjs(this.pickupDate).add(1, 'day').format('YYYY-MM-DD');
  }

  get shippingCost(): string {
    return this._shippingCost;
  }

  set shippingCost(value: string) {
    this._shippingCost = value;
  }

  get disabled(): boolean {
    return !(
      this.pickupDate &&
      this.deliveryDate &&
      this.shippingCost &&
      parseFloat(this.shippingCost) > 0
    );
  }

  handleBook(): void {
    this.model.submitBook(
      dayjs(this.pickupDate).toISOString(),
      dayjs(this.deliveryDate).toISOString(),
      parseFloat(this.shippingCost)
    );
  }
}

export default BookViewModel;
