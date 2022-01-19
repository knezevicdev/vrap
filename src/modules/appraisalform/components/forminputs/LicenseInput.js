import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import {
  isValidLicense,
  getLicenseErrors
} from '../../lib/validation/validation';
import { formatLicensePlate } from '../../lib/validation/formatting';
import { FormFields } from './Inputs.language';

const LicenseInput = ({ field, className, onKeyPressEnter }) => {
  const ref = useRef();
  const { onChange } = field;

  useEffect(() => {
    // This is to prevent a bug for android https://tdalabs.atlassian.net/browse/CW-91
    if (ref && ref.current) {
      ref.current.blur();
    }
  }, []);

  const handleOnChange = event => {
    const value = formatLicensePlate(event.target.value);
    const error = !isValidLicense(value);
    const errorMessage = getLicenseErrors(value);
    onChange({ ...field, value, error, errorMessage });
  };

  const { placeholder, label } = FormFields.license;

  return (
    <LicenseField
      className={className}
      innerRef={ref}
      field={{
        ...field,
        placeholder: placeholder,
        label: label,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter
      }}
    />
  );
};

const LicenseField = styled(Input)`
  width: 100%;
  margin-right: 15px;

  @media (min-width: 768p) {
    margin-right: 20px;
  }

  & label,
  span {
    text-align: left;
  }

  & input {
    width: 100%;
  }
`;

export default LicenseInput;
