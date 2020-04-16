import { SubmitContactStore } from '../../store';
import { CheckboxKey, SubmitContactFormStore, TextFieldKey } from './store';

import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';
import { Status } from 'src/networking/types';

class SubmitContactFormViewModel {
  private analyticsHandler: AnalyticsHandler;
  private submitContactStore: SubmitContactStore;
  private submitContactFormStore: SubmitContactFormStore;

  readonly headingText: string = 'All fields required';
  readonly firstNamePlaceholder: string = 'First name';
  readonly lastNamePlaceholder: string = 'Last name';
  readonly emailPlaceholder: string = 'example@example.com';
  readonly phonePlaceholder: string = '( _ _ _ ) _ _ _ - _ _ _ _';
  readonly byClickingSubmitLabel: string = 'By clicking Submit, you:';
  readonly legalPhoneLabel: string = `Certify that you have read and agree to the <0>E-SIGN Consent</0> (enables all transactions and disclosure delivery to occur electronically) and Vroom's <1>Terms of Use</1>, <2>Financial Privacy Policy</2> and <3>Privacy Policy.</3> You also understand that some of your data will be shared with Rocket Auto and will be used in accordance with <4>Rocket Auto's Privacy Policy.</4>`;
  readonly legalTcpaLabel: string = `Consent to receive autodialed calls and/or text messages from or on behalf of Vroom or Rocket Auto at the telephone number(s) you provided, including your wireless number, if applicable, regarding your interest in buying or selling a car and for other marketing purposes. Your consent is not required to purchase from Vroom.`;
  readonly buttonLabel: string = 'Submit';

  constructor(
    submitContactStore: SubmitContactStore,
    submitContactFormStore: SubmitContactFormStore
  ) {
    this.analyticsHandler = new AnalyticsHandler();
    this.submitContactStore = submitContactStore;
    this.submitContactFormStore = submitContactFormStore;
  }

  //#region First Name
  firstNameError(): boolean {
    return (
      this.submitContactFormStore.firstName.touched &&
      !this.submitContactFormStore.firstName.valid
    );
  }
  firstNameLabel(): string {
    return this.firstNameError()
      ? 'Please enter a valid first name'
      : 'First name';
  }

  firstNameValue(): string {
    return this.submitContactFormStore.firstName.value;
  }
  //#endregion

  //#region Last Name
  lastNameError(): boolean {
    return (
      this.submitContactFormStore.lastName.touched &&
      !this.submitContactFormStore.lastName.valid
    );
  }
  lastNameLabel(): string {
    return this.lastNameError()
      ? 'Please enter a valid last name'
      : 'Last name';
  }

  lastNameValue(): string {
    return this.submitContactFormStore.lastName.value;
  }
  //#endregion

  //#region Email
  emailError(): boolean {
    return (
      this.submitContactFormStore.email.touched &&
      !this.submitContactFormStore.email.valid
    );
  }
  emailLabel(): string {
    return this.emailError() ? 'Please enter a valid email' : 'Email address';
  }

  emailValue(): string {
    return this.submitContactFormStore.email.value;
  }
  //#endregion

  //#region Phone
  phoneError(): boolean {
    return (
      this.submitContactFormStore.phone.touched &&
      !this.submitContactFormStore.phone.valid
    );
  }
  phoneLabel(): string {
    return this.phoneError()
      ? 'Please enter a valid phone number'
      : 'Phone number';
  }

  phoneValue(): string {
    return this.submitContactFormStore.phone.value;
  }
  //#endregion

  //#region Legal Phone
  legalPhoneGranted(): boolean {
    return this.submitContactFormStore.legalPhoneGranted;
  }
  //#endregion

  //#region Legal TCPA
  legalTcpaGranted(): boolean {
    return this.submitContactFormStore.legalTcpaGranted;
  }
  //#endregion

  formIsValid(): boolean {
    return this.submitContactFormStore.formIsValid;
  }

  showButtonSpinner(): boolean {
    return this.submitContactFormStore.submitContactStatus === Status.FETCHING;
  }

  buttonDisabled(): boolean {
    return (
      !this.formIsValid() ||
      this.submitContactFormStore.submitContactStatus === Status.FETCHING
    );
  }

  setTextField(name: TextFieldKey, value: string): void {
    this.submitContactFormStore.setTextField(name, value);
  }

  setCheckbox(name: CheckboxKey, checked: boolean): void {
    this.submitContactFormStore.setCheckbox(name, checked);
  }

  async handleSubmit(): Promise<void> {
    this.submitContactStore.setShowErrorBanner(false);
    const car = this.submitContactStore.vehicle._source;
    await this.submitContactFormStore.submitContact(car);
    if (this.submitContactFormStore.submitContactStatus === Status.SUCCESS) {
      this.submitContactStore.setShowSuccess(true);
      const {
        inventoryId,
        leadFlagPhotoUrl,
        listingPrice,
        make,
        model,
        vin,
        year,
      } = car;
      const product = {
        imageUrl: leadFlagPhotoUrl,
        make,
        model,
        name: `${year} ${make} ${model}`,
        price: listingPrice,
        sku: inventoryId,
        url: `/inventory/${vin}`,
        vin,
        year,
      };
      this.analyticsHandler.trackContactSubmitted(product);
      const traits = {
        firstName: this.submitContactFormStore.firstName.value,
        lastName: this.submitContactFormStore.lastName.value,
        email: this.submitContactFormStore.email.value,
        phone: this.submitContactFormStore.phone.value.replace(/[\s()-]/g, ''),
      };
      // FIT-198 & FIT-227 added this identify call.
      // This is a key piece in how the client receives lead data.
      // Be aware that there is external configuration in segment
      // that listens for this call.
      this.analyticsHandler.identify(traits);
      // FIT-247 added this virtual pageview by request of the analytics team.
      // This is atypical, but allows them to analyze the funnel in a useful way.
      // Please use the "src/components/Page" component to handle standard pageview use cases.
      this.analyticsHandler.page('Submit Contact Complete');
    } else if (
      this.submitContactFormStore.submitContactStatus === Status.ERROR
    ) {
      this.submitContactStore.setShowErrorBanner(true);
    }
  }
}

export default SubmitContactFormViewModel;
