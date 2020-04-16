import debounce from 'lodash.debounce';
import { action, observable, runInAction } from 'mobx';

import { Car } from 'src/networking/models/Inventory.v3';
import { Networker } from 'src/networking/Networker';
import { Status } from 'src/networking/types';

const TEXT_FIELD_DEBOUNCE_WAIT = 400;

export type TextFieldKey = 'firstName' | 'lastName' | 'email' | 'phone';
interface TextFieldState {
  touched: boolean;
  valid: boolean;
  value: string;
}

export type CheckboxKey = 'legalTcpaGranted' | 'legalPhoneGranted';

export class SubmitContactFormStore {
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
  @observable legalTcpaGranted = false;
  @observable legalPhoneGranted = false;
  @observable formIsValid = false;
  @observable submitContactStatus: Status = Status.INITIAL;

  private networker: Networker;

  constructor() {
    this.networker = new Networker();
  }

  private validateForm = (): void => {
    runInAction(() => {
      this.formIsValid =
        this.firstName.touched &&
        this.firstName.valid &&
        this.lastName.touched &&
        this.lastName.valid &&
        this.email.touched &&
        this.email.valid &&
        this.phone.touched &&
        this.phone.valid &&
        this.legalTcpaGranted &&
        this.legalPhoneGranted;
    });
  };

  private noNumbersOrSpecialCharsRegex = new RegExp(/^([^0-9*$&%@#:!()]*)$/);

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

  private validateTextField = (name: TextFieldKey, value: string): void => {
    switch (name) {
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
  setCheckbox = (name: CheckboxKey, checked: boolean): void => {
    this[name] = checked;
    this.validateForm();
  };

  @action
  submitContact = async (car: Car): Promise<void> => {
    this.submitContactStatus = Status.FETCHING;
    const {
      color,
      doorCount,
      listingPrice,
      make,
      miles,
      model,
      trim,
      vin,
      year,
    } = car;
    const data = {
      type: 'Website',
      tradeIn: false,
      message: {
        form: 'submit-contact',
        source: 'rocket_auto',
        brand: 'rocket_auto',
        // eslint-disable-next-line @typescript-eslint/camelcase
        utm_source: '',
        site: 'vroom.rocketauto.com',
      },
      person: {
        consent: [
          {
            type: 'TCPA',
            granted: this.legalTcpaGranted,
          },
          {
            type: 'phone',
            granted: this.legalPhoneGranted,
          },
        ],
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phone: [
          {
            type: null,
            number: this.phone.value.replace(/[\s()-]/g, ''),
          },
        ],
        email: [
          {
            type: null,
            address: this.email.value,
          },
        ],
      },
      inventory: {
        type: 'vehicle',
        vehicle: {
          color,
          doors: doorCount,
          make,
          miles,
          model,
          price: listingPrice,
          trim,
          vin,
          year,
        },
      },
      weblead: {
        webpage: 'submit-contact',
        dealership: 'Rocket Auto',
        subid: '',
      },
    };

    try {
      await this.networker.postLeadsAttribution(data);
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
