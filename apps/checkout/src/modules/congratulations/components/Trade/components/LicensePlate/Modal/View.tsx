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
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryBlack = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.black;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const CustomModal = styled(Modal)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: ${primaryWhite};
  max-width: 379px;
  max-height: 460px;
  border-bottom: solid 4px ${primaryBrand};
  outline: none;

  ${addStyleForMobile(`
    padding: 24px;
  `)}
`;

const Close = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  padding: 8px;
`;

const ContentTitle = styled(Heading.Four)`
  text-align: center;
  padding: 24px 48px;
`;

const Select = styled.div`
  display: flex;
  cursor: pointer;
  padding: 0px 32px;
  margin-bottom: 16px;
`;

const Vehicles = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Vehicle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 16px;
  padding-bottom: 16px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
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
  min-width: 180px;
  max-width: 180px;
  margin-left: auto;
  margin-right: auto;
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
      <ContentTitle>Which vehicle would you like to sell?</ContentTitle>
      <Vehicles>
        {vehicles.map((vehicle) => {
          const vin = vehicle.vin;
          const car = vehicle.car;
          const selected = selectedVin ? selectedVin == vin : false;

          return (
            <Select key={vin} onClick={onSelect(vin)}>
              <Circle selected={selected}>{selected && <InnerCircle />}</Circle>
              <Vehicle>
                <Title.Three>{car}</Title.Three>
                <Body.Regular>{vin}</Body.Regular>
              </Vehicle>
            </Select>
          );
        })}
      </Vehicles>
      <Footer>
        <Next disabled={isNextDisabled} onClick={onNextClick}>
          Next
        </Next>
      </Footer>
    </CustomModal>
  );
};

export default observer(ModalView);
