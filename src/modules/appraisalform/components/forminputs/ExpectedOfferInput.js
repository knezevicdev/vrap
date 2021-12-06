import React from 'react';
import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import { displayCurrency } from '@app/lib/validation/displayFormatting';
import { numbersOnly } from '@app/lib/validation/formatting';

const ExpectedOfferInput = ({ field, className }) => {
  const { onChange, value } = field;
  const price = displayCurrency(value);

  const handleOnChange = event => {
    const value =
      numbersOnly(event.target.value) === ''
        ? null
        : numbersOnly(event.target.value);

    onChange({ ...field, value });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.expectedOffer.placeholder,
        label: FormFields.expectedOffer.label,
        onChange: handleOnChange,
        value: price,
        maxlength: '8'
      }}
    />
  );
};

ExpectedOfferInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default ExpectedOfferInput;
