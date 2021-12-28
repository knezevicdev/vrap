/**
 * Steps to implement
 * 1. Copy React constructors that instantiate all this stuff
 * 2. Initialize this.state.errors = {}
 */

import { track } from '../AnalyticsLib';
import { getDecryptedValue } from '../credit/creditLib.js';
import { getModifications } from '../credit/creditModificationLogic';
import { encrypt as encryptFn } from '../utils/encrypted';

export const coApplicantPrefix = 'coApplicant_';
export const previousPrefix = 'previous_';

// checks field to see if it's valid
// If error, then returns error message
export function validateField(
  field,
  value,
  modifyState = true,
  params = {
    /* useState */
  }
) {
  let fieldSplit = field.split('_');
  const unprefixedField = fieldSplit[fieldSplit.length - 1];
  let validationFunc =
    this.applicantValidationFuncs[field] ||
    this.applicantValidationFuncs[unprefixedField] ||
    this.universalValidationFuncs[field];

  if (!validationFunc && this.dependentValidationFuncs) {
    validationFunc = this.dependentValidationFuncs[field];
  } else if (!validationFunc && this.optionalValidationFuncs) {
    validationFunc = this.optionalValidationFuncs[unprefixedField];
  }

  if (validationFunc == null) {
    return false;
  }
  const propsOrState = params && params.useState ? this.state : this.props;

  let valueToUse =
    value != null ? value : getDecryptedValue(field, propsOrState);
  const error = validationFunc(valueToUse, propsOrState, field);

  if (modifyState) {
    this.setState((previousState) => {
      return {
        ...previousState,
        errors: {
          ...previousState.errors,
          [field]: error,
        },
      };
    });
  }

  return error;
}

function getCoApplicantFields(self) {
  if (self.coApplicantFields == null) {
    self.coApplicantFields = (
      self.defaultApplicantFields || self.applicantFields
    ).map((key) => coApplicantPrefix + key);
  }
  return self.coApplicantFields;
}

// called when "submit" is pressed, validates entire form and displays error messages
// returns true if no errors, false otherwise
export function validateForm(event, useState = false) {
  let isError = false;

  let fields = this.applicantFields.slice(0);

  if (needToValidateCoApplicant(this)) {
    fields.push(...getCoApplicantFields(this));
  }

  if (this.universalFields != null) {
    fields.push(...this.universalFields);
  }

  if (this.secureApplicantFields != null) {
    fields.push(...this.secureApplicantFields);
  }

  if (this.allApplicantFields != null) {
    fields.push(...this.allApplicantFields);
  }

  fields.forEach((field) => {
    let error = this.validateField(field, undefined, true, { useState });
    if (error && !isError && this['_' + field]) {
      this['_' + field].focus();
      isError = true;
    }
  });

  return !isError;
}

// used for determining whether to disable submit button
export function isFormValid(params) {
  if (
    this.universalFields == null &&
    this.applicantFields == null &&
    this.secureApplicantFields == null &&
    this.dependentFields == null
  ) {
    throw new Error(
      'No fields specified to validate. Must define applicantFields or universalFields'
    );
  }

  let fields = this.applicantFields.slice(0);

  if (needToValidateCoApplicant(this)) {
    fields.push(...getCoApplicantFields(this));
  }

  if (this.universalFields != null) {
    fields.push(...this.universalFields);
  }

  if (this.secureApplicantFields != null) {
    fields.push(...this.secureApplicantFields);
  }

  for (let i = 0; i < fields.length; i++) {
    let error = this.validateField(fields[i], undefined, false, params);
    if (error) {
      return false;
    }
  }

  return true;
}

// if formatFunc specified, then formats field using that function
export function onChangeInput(event, args = {}) {
  const {
    formatFunc,
    newValue,
    useState = false,
    secure = false,
    encrypt,
  } = args;
  const { target } = event;
  const { name } = target;
  const oldValue = useState ? this.state[name] : this.props[name];

  let value;
  if (target.type === 'checkbox') {
    value = target.checked;
  } else {
    if (newValue != null) {
      value = newValue;
    } else {
      value = target.value;
    }
  }

  const formattedValue =
    formatFunc != null ? formatFunc(value, oldValue) : value;
  const valueToStore = encrypt ? encryptFn(formattedValue) : formattedValue;

  if (useState) {
    const newState = {
      [name]: valueToStore,
      ...getModifications(name, valueToStore),
    };
    this.setState(newState);
  } else if (secure) {
    this.props.updateFieldSecure(name, valueToStore);
  } else {
    this.props.updateField(name, valueToStore);
  }

  if (this.state.errors[name]) {
    this.validateField(name, undefined, true, { useState });
  }
}

// TODO: this validate function needs to be split out (see componentDidMount in Input.js)
export function blurField(fieldName, useState = false, formName = 'Form') {
  const trackData = {
    eventName: 'interaction',
    category: `${formName} Form`,
    label: fieldName,
  };
  track({ ...trackData });
  this.validateField(fieldName, undefined, true, { useState });
}

export function toggleCoApplicant(event) {
  event && event.preventDefault();
  const coApplicantFields = (
    this.defaultApplicantFields || this.applicantFields
  ).reduce((acc, key) => {
    return {
      ...acc,
      [coApplicantPrefix + key]: null,
    };
  }, {});

  if (this.coApplicantFields == null) {
    this.coApplicantFields = this.defaultApplicantFields.map(
      (key) => coApplicantPrefix + key
    );
  } else {
    this.coApplicantFields = null;
  }

  this.props.updateFields(coApplicantFields);
  this.props.toggleCoApplicant();
}

function needToValidateCoApplicant(self) {
  return !self.noCoApplicantFields && self.props.coApplicant;
}

// [MA RESTRICTION]
// TODO: Remove when MA restriction is lifted
// Used in `componentDidUpdate` to compare the residential state on `prevProps` to the one on `currProps`
// Can be deleted once we are allowed to sell vehicles in MA.
export const isInvalidState = (prevState, currState) => {
  const invalidStates = ['MA', 'AK', 'HI', 'PA'];
  return invalidStates.some((s) => s === prevState || s === currState);
};
