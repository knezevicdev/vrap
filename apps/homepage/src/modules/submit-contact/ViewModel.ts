import { reaction } from 'mobx';

import { SubmitContactStore } from './store';

import { Status } from 'src/networking/types';

class SubmitContactViewModel {
  private disposeShowErrorBannerReaction?: () => void;
  private disposeShowSuccessReaction?: () => void;
  private store: SubmitContactStore;

  readonly title: string = 'Start Purchase';
  readonly directions: string =
    'Fill out the form below to begin your purchase.';
  readonly errorTop: string = 'Looks like that car is no longer available.';
  readonly errorBottom: string = 'Check out more options.';

  constructor(store: SubmitContactStore) {
    this.store = store;
  }

  startReactions(): void {
    this.disposeShowErrorBannerReaction = reaction(
      () => this.store.showErrorBanner,
      showErrorBanner => {
        if (showErrorBanner) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }
    );
    this.disposeShowSuccessReaction = reaction(
      () => this.store.showSuccess,
      showSuccess => {
        if (showSuccess) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }
    );
  }

  stopReactions(): void {
    if (this.disposeShowErrorBannerReaction) {
      this.disposeShowErrorBannerReaction();
    }
    if (this.disposeShowSuccessReaction) {
      this.disposeShowSuccessReaction();
    }
  }

  showErrorBanner(): boolean {
    return this.store.showErrorBanner;
  }

  showSuccess(): boolean {
    return this.store.showSuccess;
  }

  loading(): boolean {
    const result =
      this.store.vehicleStatus === Status.FETCHING ||
      this.store.vehicleStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.vehicleStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.vehicleStatus === Status.ERROR;
  }
}

export default SubmitContactViewModel;
