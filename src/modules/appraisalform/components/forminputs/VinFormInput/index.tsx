import React, { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import styled from 'styled-components';

import { VROOM_VIN_SUBSTRING } from '../../../constants/misc';
import Dialog from '../../../Dialog/VinInformation';
import { FormField } from '../../componentInterfaces.d';
import { lettersAndNumbersOnly } from '../../formatting';
import Input from '../../Input';
import { getVinErrors, isValidVin } from '../../validation';

import Icon, { Icons } from 'src/core/Icon';

const VinFormInput: React.FC<{
  field: FormField;
  className?: string;
  onKeyPressEnter: () => void;
  disabled?: boolean;
}> = ({ field, className, onKeyPressEnter, disabled = false }) => {
  const { onChange } = field;
  const [showVinDialog, setShowVinDialog] = useState(false);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = lettersAndNumbersOnly(event.target.value, 17);
    const hasValidationError =
      !value.includes(VROOM_VIN_SUBSTRING) && !isValidVin(value);
    const errorMessage = getVinErrors(value);
    onChange({
      ...field,
      value,
      validationError: hasValidationError,
      errorMessage,
    });
  };

  const handleShowVinDialog = () => {
    setShowVinDialog(true);
  };

  const handleHideVinDialog = () => {
    setShowVinDialog(false);
  };

  const handleOnKeyPressEnter: KeyboardEventHandler<HTMLSpanElement> = (
    event
  ) => {
    if (event.key === 'Enter') {
      onKeyPressEnter();
    }
  };

  return (
    <Container>
      <VinField
        className={className}
        field={{
          ...field,
          placeholder: 'VIN Number',
          label: (
            <LabelSpan>
              Vehicle Identification Number (VIN){' '}
              <InfoButton onClick={() => handleShowVinDialog()}>
                <VinInfoIcon icon={Icons.INFO} />
              </InfoButton>
            </LabelSpan>
          ),
          onChange: handleOnChange,
          onKeyPress: handleOnKeyPressEnter,
          dataQa: 'Vin Number',
          disabled,
        }}
      />
      {showVinDialog && <Dialog closeModalHandler={handleHideVinDialog} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const VinField = styled(Input)`
  width: 100%;
  display: flex;

  & label,
  span {
    text-align: left;
  }

  & input {
    width: 100%;
  }
`;

const LabelSpan = styled.span`
  display: flex;
`;

const VinInfoIcon = styled(Icon)`
  height: 13px;
  width: 13px;
  cursor: pointer;
`;

const InfoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export default VinFormInput;
