import { sections } from '../../store/sell/constants';
import { page, track } from '../AnalyticsLib';

export const startAppraisalClicked = {
  action: 'Start Appraisal Clicked',
  category: 'Sell',
};

export function trackProcessStart() {
  page(eventDetails('Sell Funnel'));

  trackEvent('Sell', 'Appraisal Started');

  page(eventDetails(sections[0]));
}

const trackEvent = (category, eventName, details = {}) => {
  track({ category, eventName, ...details });
};

const eventDetails = (pageName) => {
  const loc = window.location;

  return {
    pageName,
    url: loc.href,
    path: loc.pathname,
  };
};

export function trackStepComplete(step, formData) {
  const stepName = sections[step];
  const details =
    step === 3
      ? {
          'Signs of Rust': formData.extConditionForm.rust,
          Dents: formData.extConditionForm.dents,
          'Dents Panels': formData.extConditionForm.dentPanels,
          'Paint Chipping': formData.extConditionForm.paintChipping,
          'Paint Chipping Panels':
            formData.extConditionForm.paintChippingPanels,
          Scratches: formData.extConditionForm.scratches,
          'Scratches Panels': formData.extConditionForm.scratchesPanels,
          Modifications: formData.extConditionForm.afterMarket,
          'Other Modifications': formData.extConditionForm.otherAfterMarket,
        }
      : {};

  trackEvent('Sell', `${stepName} Completed`, details);
}

export function trackNextStepViewed(step) {
  const stepName = sections[step];
  const pageName = `${stepName} Viewed`;

  const pageEventDetails = eventDetails(pageName);

  if (step) {
    pageEventDetails.url += `/${stepName}`;
    pageEventDetails.path += `/${stepName}`;
  }

  page(pageEventDetails);
}

export function trackAppraisalReviewViewed() {
  page({
    pageName: 'Appraisal Review',
    category: 'Sell',
  });
}

export function trackAppraisalSubmitted() {
  page({
    pageName: 'Congratulations',
    category: 'Sell',
  });
}

export function trackOfferResponse(response) {
  const accepted = response.accepted ? 'Accepted' : 'Rejected';
  const trackEventDetails = {
    eventName: `Appraisal Offer ${accepted}`,
    accepted: response.accepted,
    offerId: response.offerId,
  };

  track(trackEventDetails);
}

export function trackIntentQuestion(intentAnswer) {
  const trackEventDetails = {
    category: 'Sell',
    eventName: `Why Are You Here Completed`,
    label: intentAnswer,
  };

  track(trackEventDetails);
}

export function trackPanelsTooltip(damageType) {
  track({
    category: 'Sell',
    eventName: `Tool Tip Clicked`,
    label: damageType,
  });
}
