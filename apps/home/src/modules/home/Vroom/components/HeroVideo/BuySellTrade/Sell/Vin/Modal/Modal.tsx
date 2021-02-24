import {
  addStyleForMobile,
  Body,
  Heading,
  Icon,
  Icons,
  ThemeProps,
  Title,
} from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const CustomModal = styled(Modal)`
  display: flex;
  position: relative;
  flex-direction: column;
  background: ${primaryWhite};
  padding: 32px;
  max-width: 640px;
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

const ContentTitle = styled(Heading.Three)`
  font-family: 'VroomSans';
  text-align: center;
`;

const ContentDescription = styled(Body.Regular)`
  margin-top: 8px;
  margin-bottom: 16px;
  text-align: center;
`;

const VinExample = styled(Body.Regular)`
  width: fit-content;
  padding: 8px 16px;
  border: solid 2px ${grayThree};
  align-self: center;
  font-weight: 600;
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 32px;

  ${addStyleForMobile(`
      flex-direction: column;
      margin-top: 16px;
      margin-bottom: 16px;
   `)}
`;

const LocationInformation = styled.div`
  display: flex;
  flex-direction: column;
  ${addStyleForMobile(`
    align-self: baseline;
    margin-bottom: 16px;
  `)}
`;

const InformationTitle = styled(Heading.Four)`
  font-family: 'VroomSans';
  margin-bottom: 4px;
`;

const InformationItem = styled(Body.Regular)`
  margin-top: 4px;
`;

const Car = styled.img`
  min-width: 276px;
  max-width: 276px;
  min-height: 108px;
  max-height: 108px;
  margin-left: 24px;
`;

const VinTitle = styled(Title.Three)`
  line-height: 24px;
  margin-bottom: 8px;
`;

Modal.setAppElement('#__next');

interface Props {
  close: () => void;
  isOpen: boolean;
}

const ModalView: React.FC<Props> = ({ close, isOpen }): JSX.Element => {
  const { publicRuntimeConfig } = getConfig();

  const onAfterOpen = (): void => {
    document.body.style.overflow = 'hidden';
  };

  const onAfterClose = (): void => {
    document.body.style.overflow = 'unset';
  };

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
      <ContentTitle>What’s a VIN?</ContentTitle>
      <ContentDescription>
        {`A Vehicle Identification Number (VIN) is like a thumbprint for your car. It's 17 characters long and contains numbers and letters.`}
      </ContentDescription>
      <VinExample>5N1AZ2MG9GN133457</VinExample>
      <LocationContainer>
        <LocationInformation>
          <InformationTitle>Where’s my vin?</InformationTitle>
          <InformationItem>1. Under the hood (up front).</InformationItem>
          <InformationItem>2. Driver’s side interior dash.</InformationItem>
          <InformationItem>3. Driver door jam (opened door)</InformationItem>
          <InformationItem>4. Rear wheel wall</InformationItem>
          <InformationItem>
            5. Under your spare tire in the trunk.
          </InformationItem>
        </LocationInformation>
        <Car
          src={`${publicRuntimeConfig.STATIC_ASSETS_HOST_URL}/vroom/images/car-vin.png`}
          alt="car with points"
        />
      </LocationContainer>
      <VinTitle>
        Your VIN can also be found on the following documents:
      </VinTitle>
      <Body.Regular>
        Registration, vehicle title, owner’s manual, insurance documents, and
        vehicle history reports.
      </Body.Regular>
    </CustomModal>
  );
};

export default ModalView;
