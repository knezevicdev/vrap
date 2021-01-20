import {
  Button,
  Icon,
  Icons,
  Input,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';

const VinContainer = styled.div`
  position: relative;
`;

const Information = styled(Icon)`
  position: absolute;
  left: 176px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  top: 2px;
`;

const VIN = styled(Input)`
  width: 100%;
`;

const CTA = styled(Button.Primary)`
  margin-top: 16px;
  width: 100%;
`;

export interface VinProps {
  getIsOpen: () => boolean;
  closeDialog: () => void;
  openDialog: () => void;
  getVin: () => string;
  onVinInput: (value: string) => void;
  getError: () => string | undefined;
  getIsButtonDisabled: () => boolean;
  onButtonClick: () => void;
}

const Vin: React.FC<VinProps> = ({
  getIsOpen,
  closeDialog,
  openDialog,
  onVinInput,
  getVin,
  getError,
  getIsButtonDisabled,
  onButtonClick,
}): JSX.Element => {
  const isOpen = getIsOpen();
  const vin = getVin();
  const error = getError();
  const disabled = getIsButtonDisabled();

  return (
    <>
      <Modal isOpen={isOpen} close={closeDialog} />
      <VinContainer>
        <div onClick={openDialog}>
          <Information icon={Icons.FEEDBACK_INFO} />
        </div>
        <VIN
          label="Vehicle Identification Number"
          placeholder="Vehicle identification number"
          value={vin}
          error={error}
          onChange={onVinInput}
        />
      </VinContainer>
      <CTA onClick={onButtonClick} disabled={disabled}>
        What’s my car worth?
      </CTA>
    </>
  );
};

export default observer(Vin);
