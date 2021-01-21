/* eslint-disable @typescript-eslint/camelcase */
import { getFiltersDataFromUrl } from '@vroom-web/catalog-url-integration';
import { PostInventoryRequestData } from '@vroom-web/inv-search-networking';
import getConfig from 'next/config';

import { EmailCaptureStore } from './store';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { getPostInventoryRequestDataFromFilterData } from 'src/modules/cars/store';
import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

class EmailCaptureCardViewModel {
  readonly emailCaptureStore: EmailCaptureStore;
  readonly fordImg = `${publicRuntimeConfig.BASE_PATH}/components/Ford10Percent.png`;
  readonly loaderImg = `${publicRuntimeConfig.BASE_PATH}/components/Vroom-Loading-Spinner-Red.gif`;
  readonly successSubscribedText: string = 'You’re subscribed.';
  readonly successThanksText: string = 'Thank you.';
  readonly errorTitleText: string = 'We’re sorry.';
  readonly errorDescriptionText: string = 'An error occurred';
  readonly errorButtonText: string = 'Retry';
  readonly emailCaptureTitleText: string = 'Get Inventory Updates';
  readonly emailCaptureDescriptionText: string =
    'Subscribe to updates, and let Vroom help you get into the car you’re searching for.';
  readonly emailCaptureButtonText: string = 'Notify Me';
  readonly inputLabel: string = 'Email Address';
  readonly inputPlaceholder: string = 'sample@email.com';
  readonly validationText: string = 'Please enter a valid email address';
  readonly legalText: string =
    'By submitting, I agree to receive communications.';
  readonly emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor(emailCaptureStore: EmailCaptureStore) {
    this.emailCaptureStore = emailCaptureStore;
  }

  getInputValue = (): string => {
    return this.emailCaptureStore.email;
  };

  getShowEmailCaptureForm = (): boolean => {
    return this.emailCaptureStore.emailCaptureStatus === Status.INITIAL;
  };

  getIsSuccessful = (): boolean => {
    return this.emailCaptureStore.emailCaptureStatus === Status.SUCCESS;
  };

  getIsError = (): boolean => {
    return this.emailCaptureStore.emailCaptureStatus === Status.ERROR;
  };

  getIsLoading = (): boolean => {
    return this.emailCaptureStore.emailCaptureStatus === Status.FETCHING;
  };

  getIsValidationError = (): boolean => {
    if (this.emailCaptureStore.isValidationError) {
      return !this.emailRegex.test(this.emailCaptureStore.email);
    }
    return false;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.emailCaptureStore.setEmail(value);
  };

  getSearchParams = (): PostInventoryRequestData => {
    if (typeof window !== 'undefined') {
      const filtersData = getFiltersDataFromUrl(window.location.href);
      const params = new URLSearchParams(window.location.search);
      const searchParams = getPostInventoryRequestDataFromFilterData(
        filtersData
      );
      return {
        ...searchParams,
        isAvailableSoon: searchParams.testdriveonly ? false : undefined,
        isTitleQAPass: params.has('isTitleQAPass')
          ? params.get('isTitleQAPass') === 'true'
          : undefined,
      };
    }
    return {};
  };

  onClick = (): void => {
    if (this.emailRegex.test(this.emailCaptureStore.email)) {
      this.emailCaptureStore.fetchEmailCapture(this.getSearchParams());
      this.emailCaptureStore.setEmailValidationError(false);
      analyticsHandler.trackEmailCaptureSubmit();
    } else {
      this.emailCaptureStore.setEmailValidationError(true);
      analyticsHandler.trackEmailCaptureSubmit(true);
    }
  };
}

export default EmailCaptureCardViewModel;
