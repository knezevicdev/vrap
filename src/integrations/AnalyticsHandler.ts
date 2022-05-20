import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { ITERABLE_UNSUBSCRIBE_KEY } = publicRuntimeConfig;

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackPriceViewed(): void {
    const name = 'Price details';
    const category = 'sell';
    this.page(name, category);
  }

  trackCongratsViewed(): void {
    const name = 'Congratulations Page';
    const category = 'sell';
    this.page(name, category);
  }

  trackPriceAutomated(): void {
    const event = 'Automated Price';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }

  trackNoPrice(): void {
    const event = 'No Price';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }

  trackContinueClick(): void {
    const event = 'Appraisal Offer Accepted';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }

  trackPaymentOptionsViewed(): void {
    const name = 'Payment Method';
    const category = 'Verification';
    this.page(name, category);
  }

  trackPaymentOptionsSubmitted(selection: string): void {
    const event = 'Payment Method Submitted';
    const category = 'Verification';
    const label = selection;
    const properties = { category, label };
    this.track(event, properties);
  }

  trackPlaidACHSelected(): void {
    const event = 'Plaid ACH Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackManualACHSelected(): void {
    const event = 'Manual ACH Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackCheckSelected(): void {
    const event = 'Check Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationReviewViewed(): void {
    const name = 'Verification Review';
    const category = 'verification';
    this.page(name, category);
  }

  trackVerificationSubmitted(email: string, firstName: string): void {
    const event = 'Verification Submitted';
    const category = 'verification';
    const properties = { email, 'Account.FirstName': firstName, category };
    this.track(event, properties);
  }

  trackLicenseToVin(label: string, category: string): void {
    const event = `What's My Car Worth? Clicked`;
    const properties = { label, category };

    this.track(event, properties);
  }

  trackSelectYourVehicle(category: string): void {
    const event = 'Select Your Vehicle Viewed';
    const properties = { category };
    this.track(event, properties);
  }

  trackMileageChange(): void {
    const event = 'Mileage Entered';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackColorChange(): void {
    const event = 'Color Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackNumberOfKeysChange(): void {
    const event = 'Keys Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackTrimChange(): void {
    const event = 'Trim Selected';
    const category = 'Sell';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackProcessStart(): void {
    const category = 'Sell';
    const properties = { category };
    const event = 'Appraisal Started';
    const nameSection = 'Vehicle Information';

    this.page(nameSection, category);
    this.track(event, properties);
  }

  trackStepComplete(step: any, formData: any): void {
    const sections: any = {
      0: 'Vehicle Information',
      1: 'Vehicle History',
      2: 'Interior Conditions',
      3: 'Exterior Conditions',
      4: 'Mechanical Condition',
      5: 'Your Information',
    };
    const stepName: string = sections[step];
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

    const event = `${stepName} Completed`;
    const category = 'Sell';
    const properties = {
      category,
      ...details,
    };

    this.track(event, properties);
  }

  trackNextStepViewed(step: any): void {
    const sections: any = {
      0: 'Vehicle Information',
      1: 'Vehicle History',
      2: 'Interior Conditions',
      3: 'Exterior Conditions',
      4: 'Mechanical Condition',
      5: 'Your Information',
    };
    const stepName = sections[step];
    const pageName = `${stepName} Viewed`;
    const category = 'Sell';

    this.page(pageName, category);
  }

  trackAppraisalReviewViewed(): void {
    const pageName = 'Appraisal Review';
    const category = 'Sell';

    this.page(pageName, category);
  }

  trackAppraisalSubmitted(): void {
    const pageName = 'Congratulations';
    const category = 'Sell';

    this.page(pageName, category);
  }

  trackIntentQuestion(intentAnswer: string): void {
    const category = 'Sell';
    const event = `Why Are You Here Completed`;
    const properties = {
      category,
      label: intentAnswer,
    };

    this.track(event, properties);
  }

  trackPanelsTooltip(damageType: string): void {
    const category = 'Sell';
    const event = `Tool Tip Clicked`;
    const properties = {
      category,
      label: damageType,
    };

    this.track(event, properties);
  }

  tracksEmailCapture = (
    eventName: string,
    loggedIn: boolean,
    mobile: number,
    nonInteraction: number,
    result: string | boolean
  ): void => {
    const trackObj = result
      ? {
          eventName,
          category: 'sell',
          loggedIn,
          mobile,
          nonInteraction,
          result,
        }
      : {
          eventName,
          category: 'sell',
          loggedIn,
          mobile,
          nonInteraction,
        };
    this.track(eventName, trackObj);
  };

  trackLeadSubmitted = (label: string, leadData: any): void => {
    const { email, phoneNumber, lead_id } = leadData;

    const trackLeadObj = {
      label,
      email,
      phone: phoneNumber,
      lead_id,
    };

    this.track('Lead Submitted', trackLeadObj);

    const trackingData = {
      phone: phoneNumber,
      emailEncrypted: '',
    };

    const parseEmail = CryptoJS.enc.Utf8.parse(email);
    const key = CryptoJS.enc.Base64.parse(ITERABLE_UNSUBSCRIBE_KEY);
    const iv = CryptoJS.enc.Utf8.parse('Example of IV123');

    const emailEncrypted = AES.encrypt(parseEmail, key, {
      iv: iv,
      keySize: 256 / 32,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    trackingData.emailEncrypted = encodeURIComponent(emailEncrypted.toString());

    this.track(`Appraisal Submitted`, trackingData);
  };

  trackAppraisalIdentify = (userId: any, appraisalData: any): void => {
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
    } = appraisalData;
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

    if (!userId) {
      this.identify(pickedTraits);
    } else {
      this.identify(pickedTraits, userId);
    }
  };

  trackVerificationOwnerViewed(): void {
    const name = 'Verification';
    const category = 'verification';
    this.page(name, category);
  }

  trackContactInfoComplete(): void {
    const event = 'Contact information completed';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackPickupInfoComplete(): void {
    const event = 'Pickup Information completed';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackPayoffInfoComplete(): void {
    const event = 'Payoff Information completed';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationDocumentsViewed(): void {
    const name = 'Doc Upload';
    const category = 'verification';
    this.page(name, category);
  }

  trackDocTypeUploaded(docType: string): void {
    const event = `${docType} uploaded`;
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
