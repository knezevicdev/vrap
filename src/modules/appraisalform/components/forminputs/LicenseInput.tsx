import { addStyleForTablet } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { formatLicensePlate } from '../formatting';
import Input from '../Input';
import { getLicenseErrors, isValidLicense } from '../validation';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
  onKeyPressEnter: (event: GenericObject) => void;
}

const LicenseInput: React.FC<Props> = ({
  field,
  className,
  onKeyPressEnter,
}) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = formatLicensePlate(event.target.value);
    const error = !isValidLicense(value);
    const errorMessage = getLicenseErrors(value);
    onChange({ ...field, value, error, errorMessage });
  };

  const { placeholder, label } = FormFields.license;

  return (
    <LicenseField
      className={className}
      field={{
        ...field,
        placeholder: placeholder,
        label: label,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter,
      }}
    />
  );
};

const LicenseField = styled(Input)`
  width: 100%;
  margin-right: 15px;

  ${addStyleForTablet(`
    margin-right: 20px;
  `)}

  & label,
  span {
    text-align: left;
  }

  & input {
    width: 100%;
  }
`;

export default LicenseInput;
