import { addStyleForTablet } from '@vroom-web/ui-lib';
import React, { KeyboardEventHandler } from 'react';
import styled from 'styled-components';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { formatLicensePlate } from '../formatting';
import Input from '../Input';
import { getLicenseErrors, isValidLicense } from '../validation';

interface Props {
  field: FormField;
  className?: string;
  onKeyPressEnter: () => void;
}

const LicenseInput: React.FC<Props> = ({
  field,
  className,
  onKeyPressEnter,
}) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = formatLicensePlate(event.target.value);
    const hasValidationError = !isValidLicense(value);
    const errorMessage = getLicenseErrors(value);
    onChange({
      ...field,
      value,
      validationError: hasValidationError,
      errorMessage,
    });
  };

  const handleOnKeyPressEnter: KeyboardEventHandler<HTMLSpanElement> = (
    event
  ) => {
    if (event.key === 'Enter') {
      onKeyPressEnter();
    }
  };

  return (
    <LicenseField
      className={className}
      field={{
        ...field,
        placeholder: 'License plate',
        label: 'License plate',
        onChange: handleOnChange,
        onKeyPress: handleOnKeyPressEnter,
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
