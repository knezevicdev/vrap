import React, { useState } from 'react';
import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import { displayPhoneNumber } from '@app/lib/validation/displayFormatting';
import { isValidPhoneNumber } from '@app/lib/validation/validation';
import { numbersOnlyString } from '@app/lib/validation/formatting';
import { FormFields } from './Inputs.language';
import { isEmpty } from 'lodash';
import { track } from '@app/lib/analytics/AnalyticsLib';

const PhoneInput = ({ field, className, optional = false, analytics }) => {
  const { value, error, onChange } = field;
  const val = value || '';
  const number = numbersOnlyString(val);
  const phone = displayPhoneNumber(number);
  const [tracked, setTracked] = useState(false);

  const handleOnChange = event => {
    const value = event.target.value;
    // If the field is optional and empty, it's still considered valid
    const error =
      isEmpty(value) && optional ? false : !isValidPhoneNumber(value);
    const maxPhoneLength = 15;
    if (value.length < maxPhoneLength) {
      onChange({ ...field, value, error });
    }
    if (analytics && !tracked) {
      track({ ...analytics, eventName: 'Phone Number entered' });
      setTracked(true);
    }
  };

  const label = optional
    ? FormFields.optionalPhoneNumber.label
    : field.label || FormFields.phoneNumber.label;

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.phoneNumber.placeholder,
        label: label,
        error: error,
        value: phone,
        onChange: handleOnChange,
        dataQa: 'Phone Number'
      }}
    />
  );
};

PhoneInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  optional: PropTypes.bool,
  analytics: PropTypes.object
};

export default PhoneInput;
