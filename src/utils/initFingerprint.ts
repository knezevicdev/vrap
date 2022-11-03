import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';

export type FingerprintResult = {
  requestId: string;
  visitorId: string;
};

const initFingerprint = async (): Promise<FingerprintResult> => {
  const fpPromise = FingerprintJS.load({
    apiKey: process.env.NEXT_PUBLIC_FINGERPRINT_PUBLIC_KEY as string,
  });
  let requestId = 'unknown';
  let visitorId = 'unknown';

  try {
    const result = await fpPromise.then((fp) => fp.get());

    if ('requestId' in result && 'visitorId' in result) {
      requestId = result.requestId;
      visitorId = result.visitorId;
    }
  } catch (e) {
    console.warn('failed to initialize fingerprint');
  }

  return {
    requestId,
    visitorId,
  };
};

export default initFingerprint;
