import {
  addStyleForMobile,
  Button,
  Dropdown,
  Input,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  grid-gap: 16px;

  ${addStyleForMobile(`
     grid-template-columns: auto;
     grid-template-rows: auto;
     grid-gap: 8px;
  `)}
`;

const State = styled(Dropdown)`
  width: 100%;
`;

const LicensePlate = styled(Input)`
  width: 100%;
  margin-right: 16px;

  @media (max-width: 390px) {
    max-width: 60%;
  }
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

export interface LicensePlateViewProps {
  getStates: () => { value: string; label: string }[];
  getPlate: () => string;
  state: undefined | { value: string; label: string };
  onLicensePlateInput: (event: React.FormEvent<HTMLInputElement>) => void;
  onStateSelected: (value: string, label: string) => void;
  getErrorForLicensePlate: () => string | undefined;
  getIsButtonDisabled: () => boolean;
  onButtonClick: () => void;
  getButtonText: () => string;
  getIsDialogOpen: () => boolean;
  getVehicles: () => { car: string; vin: string }[];
  closeDialog: () => void;
  trackLicensePlateClick?: () => void;
}

const LicensePlateView: React.FC<LicensePlateViewProps> = ({
  getStates,
  getPlate,
  onLicensePlateInput,
  onStateSelected,
  getErrorForLicensePlate,
  getIsButtonDisabled,
  onButtonClick,
  getButtonText,
  getIsDialogOpen,
  getVehicles,
  closeDialog,
  trackLicensePlateClick,
}): JSX.Element => {
  const states = getStates();
  const plate = getPlate();
  const error = getErrorForLicensePlate();
  const disabled = getIsButtonDisabled();
  const button = getButtonText();
  const isDialogOpen = getIsDialogOpen();
  const vehicles = getVehicles();

  return (
    <>
      <Modal
        vehicles={vehicles}
        isOpen={isDialogOpen}
        close={closeDialog}
        trackLicensePlateClick={trackLicensePlateClick}
      />
      <Inputs>
        <LicensePlate
          label="License plate"
          placeholder="License plate"
          value={plate}
          error={error}
          onChange={onLicensePlateInput}
        />
        <State
          placeholder="State"
          label="State"
          options={states}
          onSelectCallback={onStateSelected}
        />
      </Inputs>
      <BtnContainer>
        <CTA onClick={onButtonClick} disabled={disabled}>
          Continue
        </CTA>
        <BackBtn> Back to Purchase </BackBtn>
      </BtnContainer>
    </>
  );
};

export default observer(LicensePlateView);
