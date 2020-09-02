import { SubmitContactFormStore, TextFieldKey } from './store';

import AnalyticsHandler, {
  ZenDeskData,
} from 'src/integrations/AnalyticsHandler';
import { Status } from 'src/networking/types';

class ContactViewModel {
  private analyticsHandler: AnalyticsHandler;
  private submitContactFormStore: SubmitContactFormStore;

  readonly title: string = 'Contact Us';
  readonly fillForm: string =
    'Fill out the form below and we’ll reply as soon as we can.';
  readonly buttonLabel: string = 'Submit';
  readonly firstNamePlaceholder: string = 'First name';
  readonly lastNamePlaceholder: string = 'Last name';
  readonly emailPlaceholder: string = 'example@example.com';
  readonly phonePlaceholder: string = '(   ) ___-____';
  readonly messagePlaceholder: string = 'Write your message here';
  readonly subjectPlaceholder: string = 'Subject';
  readonly defaultQuestion: string = 'What are you contacting us about?';
  readonly zenDeskQuestions: Array<string> = [
    'I have a question about my order',
    'I have a question about my account',
    'Other',
  ];

  constructor(submitContactFormStore: SubmitContactFormStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.submitContactFormStore = submitContactFormStore;
  }

  //#region Subject
  subjectError(): boolean {
    return (
      this.submitContactFormStore.subject.touched &&
      !this.submitContactFormStore.subject.valid
    );
  }
  subjectLabel(): string {
    return this.subjectError() ? 'Please choose a subject' : 'Subject';
  }

  //#endregion

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

  //#region Message
  messageError(): boolean {
    return (
      this.submitContactFormStore.message.touched &&
      !this.submitContactFormStore.message.valid
    );
  }
  messageLabel(): string {
    return this.messageError() ? 'Please enter a valid message' : 'Message';
  }

  messageValue(): string {
    return this.submitContactFormStore.message.value;
  }
  //#endregion

  formIsValid(): boolean {
    return this.submitContactFormStore.formIsValid;
  }

  showButtonSpinner(): boolean {
    return this.submitContactFormStore.submitContactStatus === Status.FETCHING;
  }

  showSuccessBanner(): boolean {
    return this.submitContactFormStore.submitContactStatus === Status.SUCCESS;
  }

  setShowErrorBanner(): boolean {
    return this.submitContactFormStore.submitContactStatus === Status.ERROR;
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

  async handleSubmit(): Promise<void> {
    await this.submitContactFormStore.submitContact();
    if (this.submitContactFormStore.submitContactStatus === Status.SUCCESS) {
      const zenDeskData: ZenDeskData = {
        subject: this.submitContactFormStore.subject.value,
      };

      this.analyticsHandler.trackContactFormSubmitted(zenDeskData);
    } else {
      this.submitContactFormStore.submitContactStatus === Status.ERROR;
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
}

export default ContactViewModel;
