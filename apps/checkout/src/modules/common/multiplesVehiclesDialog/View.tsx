import {
  addStyleForMobile,
  Body,
  Button,
  Heading,
  Icon,
  Icons,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react';
import getConfig from 'next/config';
import React from 'react';
import Modal from 'react-modal';
import styled, { css } from 'styled-components';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const CustomModal = styled(Modal)`
  display: grid;
  padding-top: 18px;
  padding-bottom: 48px;
  grid-template-rows: 12px 68px auto auto 48px;
  grid-gap: 16px;
  max-width: 692px;
  width: 100%;
  justify-items: center;
  background: ${primaryWhite};
  border-bottom: 4px solid ${primaryBrand};
  z-index: 1;
  &:focus {
    outline: none;
  }
  ${addStyleForMobile(` 
  width: 100%;
`)}
`;

const Close = styled.a`
  justify-self: right;
  padding-right: 18px;
  cursor: pointer;
`;

const ContentTitle = styled(Heading.Four)`
  text-align: center;
`;

const SelectBorder = css`
  outline: ${primaryBrand};
  outline-width: 2px;
  outline-style: solid;
`;

const Select = styled.div<{ selected?: boolean }>`
  display: flex;
  cursor: pointer;
  margin-top: 4px;
  padding: 18px;
  border: 1px solid ${primaryWhite};
  box-sizing: border-box;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
  min-width: 480px;

  ${(props) => props.selected && SelectBorder};

  ${addStyleForMobile(` 
min-width: 100%; 
`)}
`;

const Vehicles = styled.div`
  max-height: 254px;
  overflow: auto;
  width: 100%;
  justify-content: center;
  display: grid;
  grid-gap: 16px;
`;

const Vehicle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Circle = styled.div<{ selected?: boolean }>`
  position: relative;
  max-height: 16px;
  min-height: 16px;
  max-width: 16px;
  min-width: 16px;
  border: solid 1px
    ${(props) => (props.selected ? primaryBrand(props) : primaryBlack(props))};
  border-radius: 50%;
  margin-right: 12px;
  margin-top: 10px;
`;

const InnerCircle = styled.div`
  position: absolute;
  min-width: 10px;
  max-width: 10px;
  min-height: 10px;
  max-height: 10px;
  border-radius: 50%;
  left: calc(50% - 10px / 2);
  top: calc(50% - 10px / 2);
  background: ${primaryBrand};
`;

const Next = styled(Button.Primary)`
  max-width: 220px;
  width: 100%;
  ${addStyleForMobile(` 
margin: 0px 50px 20px;
`)}
`;

const Car = styled.img`
  width: 68px;
  height: 68px;
`;

export interface ModalProps {
  close: () => void;
  isOpen: boolean;
  vehicles: { car: string; vin: string }[];
  getSelectedVin: () => undefined | string;
  getIsNextDisabled: () => boolean;
  onSelect: (vin: string) => () => void;
  onNextClick: () => void;
}

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

const ModalView: React.FC<ModalProps> = ({
  close,
  isOpen,
  vehicles,
  getSelectedVin,
  getIsNextDisabled,
  onSelect,
  onNextClick,
}): JSX.Element => {
  const onAfterOpen = (): void => {
    document.body.style.overflow = 'hidden';
  };

  const onAfterClose = (): void => {
    document.body.style.overflow = 'unset';
  };

  const selectedVin = getSelectedVin();
  const isNextDisabled = getIsNextDisabled();

  return (
    <CustomModal
      style={{
        overlay: {
          backgroundColor: 'rgba(4, 16, 32, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
          zIndex: 1101, // Header is 1100
        },
      }}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
      onRequestClose={close}
    >
      <Close onClick={close}>
        <Icon icon={Icons.CLOSE_LARGE} />
      </Close>
      <Car src={`${BASE_PATH}/assets/icons/multiple-cars.svg`} />

      <ContentTitle>Which vehicle would you like to sell?</ContentTitle>
      <Vehicles>
        {vehicles.map((vehicle) => {
          const vin = vehicle.vin;
          const car = vehicle.car;
          const selected = selectedVin ? selectedVin == vin : false;

          return (
            <Select key={vin} onClick={onSelect(vin)} selected={selected}>
              <Circle selected={selected}>{selected && <InnerCircle />}</Circle>
              <Vehicle>
                <Title.Three>{car}</Title.Three>
                <Body.Regular>{vin}</Body.Regular>
              </Vehicle>
            </Select>
          );
        })}
      </Vehicles>
      <Next disabled={isNextDisabled} onClick={onNextClick}>
        Next
      </Next>
    </CustomModal>
  );
};

export default observer(ModalView);
