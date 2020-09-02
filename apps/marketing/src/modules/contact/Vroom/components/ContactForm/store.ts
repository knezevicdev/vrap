import debounce from 'lodash.debounce';
import { action, observable, runInAction } from 'mobx';
import { createContext } from 'react';

import { ContactNetworker } from 'src/networking/ContactNetworker';
import { Status } from 'src/networking/types';

const TEXT_FIELD_DEBOUNCE_WAIT = 400;

export type TextFieldKey =
  | 'subject'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'message';

interface TextFieldState {
  touched: boolean;
  valid: boolean;
  value: string;
}

export class SubmitContactFormStore {
  @observable subject: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };
  @observable firstName: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };
  @observable lastName: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };
  @observable email: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };
  @observable phone: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };
  @observable message: TextFieldState = {
    touched: false,
    valid: false,
    value: '',
  };

  @observable formIsValid = false;
  @observable submitContactStatus: Status = Status.INITIAL;
  @observable showSuccess = false;

  private networker: ContactNetworker;

  constructor() {
    this.networker = new ContactNetworker();
  }

  private validateForm = (): void => {
    runInAction(() => {
      this.formIsValid =
        this.subject.touched &&
        this.subject.valid &&
        this.firstName.touched &&
        this.firstName.valid &&
        this.lastName.touched &&
        this.lastName.valid &&
        this.email.touched &&
        this.email.valid &&
        this.phone.touched &&
        this.phone.valid &&
        this.message.touched &&
        this.message.valid;
    });
  };

  private noNumbersOrSpecialCharsRegex = new RegExp(/^([^0-9*$&%@#:!()]*)$/);

  private validateSubject = debounce((value: string) => {
    const valid: boolean = value.length > 0;
    runInAction(() => {
      this.subject = {
        ...this.subject,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private validateFirstName = debounce((value: string) => {
    const valid: boolean =
      this.noNumbersOrSpecialCharsRegex.test(value) && value.length >= 2;
    runInAction(() => {
      this.firstName = {
        ...this.firstName,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private validateLastName = debounce((value: string) => {
    const valid: boolean =
      this.noNumbersOrSpecialCharsRegex.test(value) && value.length >= 2;
    runInAction(() => {
      this.lastName = {
        ...this.lastName,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private emailRegExp = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  private validateEmail = debounce((value: string) => {
    const valid: boolean = this.emailRegExp.test(value) && value.length <= 320;
    runInAction(() => {
      this.email = {
        ...this.email,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private phoneRegExp = new RegExp(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  );
  private validatePhone = debounce((value: string) => {
    const valid: boolean = this.phoneRegExp.test(value);
    runInAction(() => {
      this.phone = {
        ...this.phone,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private validateMessage = debounce((value: string) => {
    const valid: boolean = value.length >= 2;
    runInAction(() => {
      this.message = {
        ...this.message,
        touched: true,
        valid,
      };
    });
    this.validateForm();
  }, TEXT_FIELD_DEBOUNCE_WAIT);

  private validateTextField = (name: TextFieldKey, value: string): void => {
    switch (name) {
      case 'subject':
        this.validateSubject(value);
        break;
      case 'firstName':
        this.validateFirstName(value);
        break;
      case 'lastName':
        this.validateLastName(value);
        break;
      case 'email':
        this.validateEmail(value);
        break;
      case 'phone':
        this.validatePhone(value);
        break;
      case 'message':
        this.validateMessage(value);
        break;
    }
  };

  @action
  setTextField = (name: TextFieldKey, value: string): void => {
    this[name] = {
      ...this[name],
      value,
    };
    this.validateTextField(name, value);
  };

  @action
  setShowSuccess = (showSuccess: boolean): void => {
    this.showSuccess = showSuccess;
  };

  @action
  submitContact = async (): Promise<void> => {
    this.submitContactStatus = Status.FETCHING;

    const msg = `${this.message.value} (Customer phone is ${this.phone.value})`;

    const zenDeskRequestData = {
      request: {
        requester: {
          name: `${this.firstName.value} ${this.lastName.value}`,
          email: this.email.value,
        },
        subject: this.subject.value,
        comment: {
          body: msg,
        },
        brand: 'Vroom',
        form: 'Support',
      },
    };

    try {
      await this.networker.postZendeskTicket(zenDeskRequestData);
      runInAction((): void => {
        this.submitContactStatus = Status.SUCCESS;
      });
    } catch {
      runInAction((): void => {
        this.submitContactStatus = Status.ERROR;
      });
    }
  };
}

export const ContactStoreContext = createContext<SubmitContactFormStore>(
  new SubmitContactFormStore()
);
