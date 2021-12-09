import React from 'react';
import Dropdown from '@app/components/Dropdown';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const StateInput = ({ field, className, onKeyPressEnter }) => {
  const { onChange } = field;
  const handleOnChange = event => {
    const value = event.target.value;
    const error = value === 'state';
    onChange({ ...field, value, error });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        placeholder: FormFields.state.placeholder,
        label: FormFields.state.label,
        type: FormFields.state.type,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter
      }}
    />
  );
};

StateInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  showDialog: PropTypes.func,
  maSelectable: PropTypes.bool,
  paSelectable: PropTypes.bool,
  onKeyPressEnter: PropTypes.func
};

export default StateInput;
