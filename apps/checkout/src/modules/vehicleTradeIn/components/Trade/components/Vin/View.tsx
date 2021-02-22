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

const VIN = styled(Input)`
  width: 100%;
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-rows: 48px;
  grid-gap: 8px;
  justify-content: center;
  padding-top: 112px;
  max-width: 272px;
  margin: 0px auto 0px auto;
`;

const CTA = styled(Button.Primary)`
  width: 100%;
`;

const BackBtn = styled(Button.Bare)`
  width: 100%;
`;

export interface VinProps {
  getIsOpen: () => boolean;
  closeDialog: () => void;
  openDialog: () => void;
  getVin: () => string;
  onVinInput: (event: React.FormEvent<HTMLInputElement>) => void;
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
      {/* <Modal isOpen={isOpen} close={closeDialog} /> */}
      <VinContainer>
        {/* <div onClick={openDialog}>
          <Information icon={Icons.FEEDBACK_INFO} />
        </div> */}
        <VIN
          label="Vehicle Identification Number"
          placeholder="Vehicle identification number"
          value={vin}
          error={error}
          onChange={onVinInput}
        />
      </VinContainer>
      <BtnContainer>
        <CTA onClick={onButtonClick} disabled={disabled}>
          Continue
        </CTA>
        <BackBtn> Back to Purchase </BackBtn>
      </BtnContainer>
    </>
  );
};

export default observer(Vin);
