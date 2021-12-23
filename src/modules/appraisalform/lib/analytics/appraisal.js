import { track } from '../AnalyticsLib';

export const trackLicenseToVin = (label, category) => {
  track({
    eventName: `What's My Car Worth? Clicked`,
    category,
    label
  });
};

export const trackSelectYourVehicle = category => {
  track({
    eventName: 'Select Your Vehicle Viewed',
    category
  });
};

export const trackOfferSubmittedViewDetails = () => {
  track({
    eventName: 'Offer Submitted View Details clicked',
    category: 'My Account',
    label: 'Offer Submitted'
  });
};

export const trackOfferPendingAccept = () => {
  track({
    eventName: 'Offer Accepted clicked',
    category: 'My Account',
    label: 'Offer Pending'
  });
};

export const trackOfferAcceptedViewDetails = () => {
  track({
    eventName: 'Offer Accepted View Details clicked',
    category: 'My Account',
    label: 'Offer Accepted'
  });
};

export const trackOfferRejectedChangeMind = () => {
  track({
    eventName: 'Changed My mind clicked',
    category: 'My Account',
    label: 'Offer Rejected'
  });
};

export const trackOfferViewDetailsLink = () => {
  track({
    eventName: 'View Offer Details clicked',
    category: 'My Account',
    label: 'View Offer Details'
  });
};

export const trackMileageChange = () => {
  track({
    eventName: 'Mileage Entered',
    action: 'Click',
    category: 'Sell'
  });
};

export const trackColorChange = () => {
  track({
    eventName: 'Color Selected',
    action: 'Click',
    category: 'Sell'
  });
};

export const trackNumberOfKeysChange = () => {
  track({
    eventName: 'Keys Selected',
    action: 'Click',
    category: 'Sell'
  });
};

export const trackTrimChange = () => {
  track({
    eventName: 'Trim Selected',
    action: 'Click',
    category: 'Sell'
  });
};

export const trackExpireReminderViewed = () => {
  track({
    eventName: 'Offer reminder notification',
    category: 'My Account'
  });
};

export const trackExpireReminderAccepted = () => {
  track({
    eventName: 'Appraisal Offer Accepted',
    category: 'My Account',
    label: 'Offer reminder notification'
  });
};
