import { PostInventoryRequestData } from '@vroom-web/inv-search-networking';
import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, makeObservable, observable, runInAction } from 'mobx';
import getConfig from 'next/config';
import { parseCookies } from 'nookies';

import EmailCaptureNetworker, {
  PostEmailCaptureRequestData,
} from './EmailCaptureNetworker';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export class EmailCaptureStore {
  private readonly emailCaptureNetworker: EmailCaptureNetworker;

  @observable email: string;
  @observable emailCaptureStatus: Status = Status.INITIAL;
  @observable isValidationError = false;

  constructor() {
    this.emailCaptureNetworker = new EmailCaptureNetworker(
      publicRuntimeConfig.HORN_SERVICE_URL || ''
    );
    this.email = '';
    if (typeof window !== 'undefined') {
      const status = window.localStorage.getItem('emailCaptureStatus');
      if (status) {
        this.emailCaptureStatus = status as Status;
      }
    }
    makeObservable(this);
  }

  getUserId = (): string | undefined => {
    const authTokenWithExpressPrefix = ClientSideCookies.get('authToken');
    if (!authTokenWithExpressPrefix) {
      return undefined;
    }
    const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
    const { sub } = jwtDecode(authToken.accessToken);
    return sub;
  };

  @action
  fetchEmailCapture = async (
    searchParams?: PostInventoryRequestData
  ): Promise<void> => {
    try {
      this.emailCaptureStatus = Status.FETCHING;

      const cookies = parseCookies();

      const emailCaptureRequestData: PostEmailCaptureRequestData = {
        payload: {
          emailAddress: this.email,
          marketingId: cookies.uuid,
          userId: this.getUserId(),
          searchParams: searchParams,
        },
      };

      await this.emailCaptureNetworker.postEmailCapture(
        emailCaptureRequestData
      );
      runInAction(() => {
        this.emailCaptureStatus = Status.SUCCESS;
        window.localStorage.setItem('emailCaptureStatus', Status.SUCCESS);
      });
    } catch {
      runInAction(() => {
        this.emailCaptureStatus = Status.ERROR;
        analyticsHandler.trackEmailCaptureErrorShown();
      });
    }
  };

  @action
  setEmail = (value: string): void => {
    this.email = value;
  };

  @action
  setEmailValidationError = (value: boolean): void => {
    this.isValidationError = value;
  };

  @action
  setEmailCaptureStatus = (value: Status): void => {
    this.emailCaptureStatus = value;
  };
}
