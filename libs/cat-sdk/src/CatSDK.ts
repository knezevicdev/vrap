import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

import CatDataNetworker from './CatDataNetworker';
import { CatData } from './types';

const CAT_DATA_EVENT_KEY = 'oncatdata';
const WINDOW_CAT_DATA_KEY = '__CAT_DATA__';

declare global {
  interface Window {
    [WINDOW_CAT_DATA_KEY]: CatData;
  }
  interface WindowEventMap {
    [CAT_DATA_EVENT_KEY]: CustomEvent<CatData>;
  }
}

interface CatSDKOptions {
  serviceBasePath?: string;
}

class CatSDK {
  private serviceBasePath: string;

  constructor(options?: CatSDKOptions) {
    this.serviceBasePath =
      options && options.serviceBasePath ? options.serviceBasePath : '';
  }

  private initUUID(): string {
    // Generate uuid
    const newUUIDValue = uuidv4();
    Cookies.set('uuid', newUUIDValue, {
      // https://github.com/js-cookie/js-cookie#expires
      // For some reason vroom decided to use 720 days for this cookie.
      expires: 720, // days
    });
    // Return the newly defined UUID.
    return newUUIDValue;
  }

  getUUID(): string {
    const uuidCookieValue = Cookies.get('uuid');
    if (uuidCookieValue) {
      return uuidCookieValue;
    }
    return this.initUUID();
  }

  async initCatData(): Promise<void> {
    const catDataNetworker = new CatDataNetworker({
      basePath: this.serviceBasePath,
    });
    const uuid = this.getUUID();
    const sitePhoneNumberCookieValue = Cookies.get('sitePhoneNumber');
    try {
      const catData = await catDataNetworker.getCatData(uuid);
      if (!sitePhoneNumberCookieValue) {
        Cookies.set('sitePhoneNumber', catData.sitePhoneNumber);
      }
      const sitePhoneNumber = sitePhoneNumberCookieValue
        ? sitePhoneNumberCookieValue
        : catData.sitePhoneNumber;
      window[WINDOW_CAT_DATA_KEY] = {
        ...catData,
        sitePhoneNumber,
      };
    } catch {
      window[WINDOW_CAT_DATA_KEY] = {
        brand: 'vroom',
        geo: {
          city: '',
          region: '',
          metroCode: '',
          postalCode: '',
          latitude: '',
          longitude: '',
        },
        sitePhoneNumber: sitePhoneNumberCookieValue || '(855)%20524-1300',
        uuid,
      };
    }
    const catDataEvent = new CustomEvent<CatData>(CAT_DATA_EVENT_KEY, {
      detail: window[WINDOW_CAT_DATA_KEY],
    });
    window.dispatchEvent(catDataEvent);
  }

  observeCatData(listener: (catDataEvent: CustomEvent<CatData>) => void): void {
    window.addEventListener(CAT_DATA_EVENT_KEY, listener);
    if (window[WINDOW_CAT_DATA_KEY]) {
      const catDataEvent = new CustomEvent<CatData>(CAT_DATA_EVENT_KEY, {
        detail: window[WINDOW_CAT_DATA_KEY],
      });
      listener(catDataEvent);
    }
  }

  unobserveCatData(
    listener: (catDataEvent: CustomEvent<CatData>) => void
  ): void {
    window.removeEventListener(CAT_DATA_EVENT_KEY, listener);
  }
}

export default CatSDK;
