import { Button, Input } from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

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
  getVin: () => string;
  onVinInput: (event: React.FormEvent<HTMLInputElement>) => void;
  getError: () => string | undefined;
  getIsButtonDisabled: () => boolean;
  onButtonClick: () => void;
  onBackToPurchase: () => void;
}

const Vin: React.FC<VinProps> = ({
  onVinInput,
  getVin,
  getError,
  getIsButtonDisabled,
  onButtonClick,
  onBackToPurchase,
}): JSX.Element => {
  const vin = getVin();
  const error = getError();
  const disabled = getIsButtonDisabled();

  return (
    <>
      <VinContainer>
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
        <BackBtn onClick={onBackToPurchase}> Back to Purchase </BackBtn>
      </BtnContainer>
    </>
  );
};

export default observer(Vin);
