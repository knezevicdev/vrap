import React from 'react';
import styled from 'styled-components';
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
    <>
      <Label>{FormFields.tradeInState.label}</Label>
      <Dropdown
        className={className}
        field={{
          ...field,
          placeholder: FormFields.tradeInState.placeholder,
          label: FormFields.tradeInState.subLabel,
          type: FormFields.tradeInState.type,
          onChange: handleOnChange,
          onKeyPress: onKeyPressEnter
        }}
      />
    </>
  );
};

const Label = styled.div`
  ${props => props.theme.typography.body}
  margin-bottom: 8px;
`;

StateInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  showDialog: PropTypes.func,
  maSelectable: PropTypes.bool,
  paSelectable: PropTypes.bool,
  onKeyPressEnter: PropTypes.func
};

export default StateInput;
