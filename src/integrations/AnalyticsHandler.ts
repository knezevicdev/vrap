import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { ITERABLE_UNSUBSCRIBE_KEY } = publicRuntimeConfig;

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackWebAppViewed(): void {
    this.page('Web App');
  }

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

  trackProvideDocumentsClicked(
    email: string,
    firstName: string,
    callback: () => void
  ): void {
    const event = 'Provide Documents Clicked';
    const category = 'verification';
    const properties = { email, 'Account.FirstName': firstName, category };
    this.track(event, properties, undefined, callback, 1500);
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

  trackMileageChange(category: string): void {
    const event = 'Mileage Entered';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackColorChange(category: string): void {
    const event = 'Color Selected';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackNumberOfKeysChange(category: string): void {
    const event = 'Keys Selected';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackTrimChange(category: string): void {
    const event = 'Trim Selected';
    const action = 'Click';
    const properties = { action, category };

    this.track(event, properties);
  }

  trackProcessStart(category: string): void {
    const properties = { category };
    const event = 'Appraisal Started';
    const nameSection = 'Vehicle Information';

    this.page('Sell Funnel');
    this.page(nameSection, category);
    this.track(event, properties);
  }

  trackStepComplete(step: any, formData: any, category: string): void {
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

  trackInvalidStateShown(vin: string, category: string): void {
    const event = 'Show State Prohibited Modal';
    const properties = {
      category,
      vin,
    };
    this.track(event, properties);
  }

  trackInvalidMakeShown(vin: string, category: string): void {
    const event = 'Show Make Prohibited Modal';
    const properties = {
      category,
      vin,
    };
    this.track(event, properties);
  }

  trackAppraisalReviewViewed(category: string): void {
    const pageName = 'Appraisal Review';

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

  trackPanelsTooltip(damageType: string, category: string): void {
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

  trackDocTypeUploaded(docType: string, priceId: string, fileId: string): void {
    const event = `${docType} uploaded`;
    const category = 'verification';
    const properties = { category, priceId, fileId, docType };
    this.track(event, properties);
  }

  trackDocTypeUploadError(
    docType: string,
    priceId: string,
    errorMessage: string,
    errorObject: Record<string, unknown> = {}
  ): void {
    const event = `${docType} Doc Upload Failed`;
    const category = 'verification';
    const properties = {
      category,
      priceId,
      errorMessage,
      docType,
      ...errorObject,
    };
    this.track(event, properties);
  }

  trackSellOrTradeIn(
    vin: string,
    category: string,
    sellOrTradeIn: string
  ): void {
    const event = 'Select Sell Or Trade In';
    const properties = {
      category,
      vin,
      sellOrTradeIn,
    };
    this.track(event, properties);
  }

  trackVerificationTaxSidebarCTAClicked(): void {
    const event = 'Tax Sidebar CTA Clicked';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationTaxSidebarDetailsClicked(): void {
    const event = 'Tax Details Clicked';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationTaxPricePageDetailsClicked(): void {
    const event = 'Tax Price Page Details Clicked';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationTaxModalCTAClicked(): void {
    const event = 'Tax Modal CTA Clicked';
    const category = 'verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackNearSUYCLocationModalShown(vin: string, userEmail: string): void {
    const event = 'Near SUYC Location Modal Shown';
    const category = 'verification';
    const properties = { category, vin, userEmail };
    this.track(event, properties);
  }

  trackNearSUYCLocationModalYesCTAClicked(
    vin: string,
    userEmail: string
  ): void {
    const event = 'Near SUYC Location Modal Yes CTA Clicked';
    const category = 'verification';
    const properties = { category, vin, userEmail };
    this.track(event, properties);
  }

  trackNearSUYCLocationModalNoCTAClicked(vin: string, userEmail: string): void {
    const event = 'Near SUYC Location Modal No CTA Clicked';
    const category = 'verification';
    const properties = { category, vin, userEmail };
    this.track(event, properties);
  }

  trackRetailAppraisalOffer(vin: string, userEmail: string): void {
    const event = 'Retail Appraisal Offer';
    const category = 'price';
    const properties = { category, vin, userEmail };
    this.track(event, properties);
  }

  trackWholesaleAppraisalOffer(vin: string, userEmail: string): void {
    const event = 'Wholesale Appraisal Offer';
    const category = 'price';
    const properties = { category, vin, userEmail };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
