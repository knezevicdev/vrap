import crypto from 'crypto';
import Cookies from 'js-cookie';

export function processFastlyValue(fastlyKey) {
  if (typeof window === 'undefined') {
    return;
  }
  const fastlyKeyResponse = getFastlyValue(fastlyKey);
  if (!fastlyKeyResponse) return;
  let persistentStorage;
  if (fastlyKey === 'fsid') {
    persistentStorage = sessionStorage;
  } else if (fastlyKey === 'fpid') {
    persistentStorage = localStorage;
  } else {
    return;
  }
  if (!fastlyKeyResponse.cookie) {
    Cookies.set(fastlyKey, fastlyKeyResponse.value);
  }
  if (!fastlyKeyResponse.browserStorage) {
    persistentStorage.setItem(fastlyKey, fastlyKeyResponse.value);
  }
}

export function getFastlyValue(fastlyKey) {
  if (typeof window === 'undefined') {
    return undefined;
  }
  let persistentStorage;
  if (fastlyKey === 'fsid') {
    persistentStorage = sessionStorage;
  } else if (fastlyKey === 'fpid') {
    persistentStorage = localStorage;
  } else {
    return undefined;
  }

  const fastlyKeyPersistentStorage = persistentStorage.getItem(fastlyKey);
  const fastlyKeyCookie = Cookies.get(fastlyKey);
  let fastlyKeyValue;
  if (fastlyKeyPersistentStorage) {
    fastlyKeyValue = fastlyKeyPersistentStorage;
  } else if (fastlyKeyCookie) {
    fastlyKeyValue = fastlyKeyCookie;
  } else {
    fastlyKeyValue = getUUID();
  }
  const result = {
    value: fastlyKeyValue,
    cookie: !!fastlyKeyCookie,
    browserStorage: !!fastlyKeyPersistentStorage,
  };
  return result;
}

export function generateUUID4() {
  return crypto.randomBytes(16).toString('hex');
}

export function getUUID() {
  const UUID_COOKIE_TIME = 730; // 2 years(days)
  const uuidCookieName = 'uuid';
  const uuidCookie = Cookies.get(uuidCookieName);

  const uuid = !uuidCookie ? generateUUID4() : uuidCookie;

  if (!uuidCookie) {
    Cookies.set(uuidCookieName, uuid, {
      expires: UUID_COOKIE_TIME,
    });
  }

  return uuid;
}
