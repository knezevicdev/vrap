import React from 'react';
import Textarea from '@app/components/Textarea';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const OtherAfterMarketInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = event => {
    let value = event.target.value;
    onChange({ ...field, value });
  };

  return (
    <Textarea
      className={className}
      field={{
        ...field,
        placeholder: FormFields.otherAfterMarket.placeholder,
        label: FormFields.otherAfterMarket.label,
        onChange: handleOnChange,
        maxlength: '255'
      }}
    />
  );
};

OtherAfterMarketInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default OtherAfterMarketInput;
