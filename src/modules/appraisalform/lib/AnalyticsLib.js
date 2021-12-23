/**
 * Tracking for Segment
 */

import qs from 'qs';

import {
  selectExperimentAssignments, // MVP, TODO: remove
  selectExperiments, // V1
} from '../store/experiment/selectors';
import { mobileDeviceType } from './device';
import { getFastlyValue, processFastlyValue } from './utils';

import { selectUUID } from 'src/store/auth/selectors';

const { BROWSER } = process.env;

const experimentAttributes = {};

const userAttributes = {
  userAgent: BROWSER && window.navigator.userAgent,
};

function getVitQueryParams() {
  if (typeof window === 'undefined') {
    return;
  }
  const { search } = window.location;
  const query = qs.parse(search, {
    ignoreQueryPrefix: true,
  });
  const {
    vit_source,
    vit_medium,
    vit_campaign,
    vit_term,
    vit_content,
    vit_dest,
  } = query;
  return {
    vit_source,
    vit_medium,
    vit_campaign,
    vit_term,
    vit_content,
    vit_dest,
  };
}

function getFastlyParams() {
  if (typeof window === 'undefined') {
    return {};
  }
  const fsid = getFastlyValue('fsid');
  const fpid = getFastlyValue('fpid');

  const fastlyParams = {};
  fastlyParams.fsid = fsid && fsid.value;
  fastlyParams.fpid = fpid && fpid.value;

  return fastlyParams;
}

export function onAnalyticsReady(callback) {
  ensureAnalyticsAvailable();
  window.analytics.ready(callback);
}

export function initAnalytics(store) {
  const state = store.getState();
  const { geoData, common, user } = state;
  const ip_address = geoData.ip_address;
  const uuid = selectUUID(state);
  userAttributes.ip_address = ip_address || '';
  userAttributes.utm_source = common.utmParams.utm_source;
  userAttributes.subid = common.subid;
  userAttributes.mobile = (mobileDeviceType === 'phone').toString();
  // set userId from store, we may have an email
  userAttributes.userId = user.externalUserID;
  userAttributes.uuid = uuid;

  const v1Experiments = selectExperiments(state);
  const v1ExperimentVariantStrings = Object.values(v1Experiments).map(
    (v1Experiment) => {
      return `${v1Experiment.optimizeId}.${v1Experiment.assignedVariant}`;
    }
  );

  const experimentAssignments = selectExperimentAssignments(state);
  const mvpExperimentVariantStrings = Object.entries(experimentAssignments).map(
    ([key, value]) => {
      const experimentId = key;
      const variantId = value.id;
      return `${experimentId}.${variantId}`;
    }
  );

  const experimentCombination = v1ExperimentVariantStrings
    .concat(mvpExperimentVariantStrings)
    .join('!');

  experimentAttributes.experimentCombination = experimentCombination;

  onAnalyticsReady(() => {
    if (typeof window.ga !== 'undefined') {
      window.ga('set', 'exp', experimentCombination);
    }
    processFastlyValue('fsid');
    processFastlyValue('fpid');
  });
}

export function track(
  properties = {},
  onSuccess = () => {},
  onError = () => {}
) {
  try {
    onAnalyticsReady(() => {
      const event = properties.eventName || properties.action;

      // sets userId value in segment track payload
      if (window.analytics.user().id() === null) {
        window.analytics.user().id(window.analytics.user().anonymousId());
      }

      if (event == null) {
        throw `Can't track null action: ${properties}`;
      } else if (
        event === 'Experiment Viewed' ||
        event === 'Full Story Started'
      ) {
        properties.nonInteraction = 1;
      }
      const vitQueryParams = getVitQueryParams();
      const fastlyParams = getFastlyParams();
      const fullProperties = {
        ...experimentAttributes,
        ...userAttributes,
        ...vitQueryParams,
        ...properties,
        ...fastlyParams,
      };
      window.analytics.track(event, fullProperties);
      onSuccess();
    });
  } catch (error) {
    onError(error);
  }
}

export function page(properties) {
  try {
    onAnalyticsReady(() => {
      const vitQueryParams = getVitQueryParams();
      const pageName = properties.pageName;
      const fastlyParams = getFastlyParams();
      const fullProperties = {
        ...experimentAttributes,
        ...userAttributes,
        ...vitQueryParams,
        ...properties,
        ...fastlyParams,
      };
      window.analytics.page(pageName, fullProperties);
    });
  } catch (error) {
    console.error('Analytics Error: ', error);
  }
}

export function trackPage(properties) {
  try {
    onAnalyticsReady(() => {
      const { category } = properties;
      const trackingProperties = {
        ...properties,
      };
      window.analytics.page(category, trackingProperties);
    });
  } catch (error) {
    console.error('Track Page Error: ', error);
  }
}

// identify should only be called when a user is in an authed state, and the value for userId should be vrooms external_user_id
export function identify(userId, traits) {
  // TODO: Standardize properties across app (e.g. zip/zipCode, phone/phoneNumber)
  const {
    firstName,
    lastName,
    email,
    phone,
    phoneNumber,
    address: street,
    city,
    state,
    zip,
    zipCode,
    subID,
    username,
  } = traits;
  const postalCode = zip || zipCode;
  let address;

  if (street || city || state || postalCode) {
    address = {
      street,
      city,
      postalCode,
      state,
      country: 'USA',
    };
  }

  const pickedTraits = {
    firstName,
    lastName,
    phone: phone || phoneNumber,
    email: email || username,
    address,
    subID,
  };

  try {
    ensureAnalyticsAvailable();
    if (!userId) {
      window.analytics.identify(pickedTraits);
    } else {
      window.analytics.identify(userId, pickedTraits);
    }
  } catch (error) {
    console.error('Analytics Error: ', error);
  }
}

export function alias(properties) {
  const { username } = properties;
  // If user not ID'd by email address
  if (userAttributes.userId !== username) {
    try {
      ensureAnalyticsAvailable();
      // make alias call (newUserId, prevUserId)
      window.analytics.alias(username, window.analytics.user().anonymousId());
      // update userId for future segment calls
      userAttributes.userId = username;
    } catch (e) {
      console.error('Analytics Error: ', e);
    }
  }
}

function ensureAnalyticsAvailable() {
  if (!BROWSER) {
    throw 'Segment tracking cannot be done on server';
  }
  if (!window.analytics) {
    throw 'window.analytics is undefined, aborting tracking call';
  }
}

export const analyticsTrack = (event, properties) => {
  onAnalyticsReady(() => {
    window.analytics.track(event, properties);
  });
};
