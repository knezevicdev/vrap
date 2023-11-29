import { isErrorResponse } from '@vroom-web/networking';

import client from '../networking/client';

type SignInCallback = () => void;
interface SignedInUser {
  externalUserID: string;
}

class AuthManager {
  private static _instance: AuthManager;
  private _listeners: SignInCallback[] = [];

  private triggerSignInStatusChange() {
    this._listeners.forEach((callback) => callback());
  }

  static addSignInListener(callback: SignInCallback) {
    this.instance._listeners.push(callback);
  }

  static removeSignInListener(callback: SignInCallback) {
    this.instance._listeners = this.instance._listeners.filter(
      (listener) => listener !== callback
    );
  }

  static async loginUser(username: string, password: string) {
    const response = await client.httpRequest<{ data: SignedInUser }>({
      method: 'POST',
      url: `${client.httpEndpoints.interchangeUrl}/myaccount/signin-web`,
      data: {
        source: 'appraisal',
        version: '2',
        timestamp: new Date(),
        payload: {
          username,
          password,
        },
      },
    });

    if (!isErrorResponse(response)) {
      this.instance.triggerSignInStatusChange();
    }

    return response;
  }

  static async registerUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    const response = await client.httpRequest<{ data: SignedInUser }>({
      method: 'POST',
      url: `${client.httpEndpoints.interchangeUrl}/myaccount/signup-web`,
      data: {
        source: 'appraisal',
        version: '2',
        timestamp: new Date(),
        payload: {
          username,
          password,
          firstName,
          lastName,
          phone,
          eventOrigin: 'suyc',
          sendWelcomeEmail: true,
          emailMarketingConsent: false,
        },
      },
    });

    if (!isErrorResponse(response)) {
      this.instance.triggerSignInStatusChange();
    }

    return response;
  }

  private constructor() {
    // nothing
  }

  private static get instance(): AuthManager {
    if (!AuthManager._instance) {
      AuthManager._instance = new AuthManager();
    }
    return AuthManager._instance;
  }
}

export default AuthManager;
