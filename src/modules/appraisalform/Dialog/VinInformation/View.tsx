import { addStyleForMobile, addStyleForTablet } from '@vroom-web/ui-lib';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';
const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;
import Icon, { Icons } from 'src/core/Icon';

const onCarList = [
  "Driver's side interior dash",
  'Under the hood (up front)',
  'Between your front carb and windshield washer unit',
  'Trunk, under the spare tire',
  'Rear wheel wall',
  'Driver door jam (open the door first)',
];

const inDocsList = [
  'Vehicle title',
  'Registration card',
  'Insurance documents',
  "Owner's manual",
  'Body shop repair records',
  'Police reports',
  'Vehicle history report or VIN check',
];

interface Props {
  closeModalHandler: () => void;
}

const VinInformationDialog: React.FC<Props> = ({ closeModalHandler }) => {
  const baseImg = `${BASE_PATH}/images/where-is-vin.png`;

  return (
    <Container data-qa="VinInformationDialog">
      <Modal>
        <CloseDialog
          onClick={(): void => closeModalHandler()}
          data-qa="exact milage close"
        >
          <CloseButtonContainer>
            <StyledIcon icon={Icons.ClOSE} />
          </CloseButtonContainer>
        </CloseDialog>
        <Title>
          What&#39;s a VIN, <br />
          and where&#39;s mine?
        </Title>
        <VinDescription>
          A Vehicle Identification Number (VIN) is like a thumbprint for your
          car.
          <br />
          &nbsp; It&#39;s 17 characters long (digits and letters) and looks like
          this:
        </VinDescription>
        <VinExample>5N1AZ2MG9GN133457</VinExample>
        <VinSeveralPlaces>
          You can find your VIN in several different places...
        </VinSeveralPlaces>
        <VinLocationImg
          alt="Where Is My VIN"
          src={`${baseImg}.png`}
          srcSet={`${baseImg}.png 320w, ${baseImg}@2x.png 768w, ${baseImg}@3x.png 1024w`}
        />
        <VinLocationLists>
          <VinLocationList>
            <ListHeader>On Your Car</ListHeader>
            <ListContainer className="on-car">
              {onCarList.map((element: any) => (
                <ListItem key={element}>{element}</ListItem>
              ))}
            </ListContainer>
          </VinLocationList>
          <VinLocationList>
            <ListHeader>In Your Documentation</ListHeader>
            <ListContainer className="in-docs">
              {inDocsList.map((element: any) => (
                <ListItem key={element}>{element}</ListItem>
              ))}
            </ListContainer>
          </VinLocationList>
        </VinLocationLists>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  margin: 12.5% auto;
  padding: 32px 64px;
  max-width: 592px;
  width: 100%;
  max-height: 370px;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  border-bottom: 4px solid #e7131a;
  boxshadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${addStyleForMobile(`
        top: 20%;
        width: 100%;
        max-width: 363px;
        height: 100%;
        max-height: 409px;
        padding: 62px 16px;
    `)}
`;

const CloseDialog = styled.div`
  position: absolute;
  right: 30px;
  top: 40px;
  color: #041022;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const CloseButtonContainer = styled.div`
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-family: 'Vroom-Sans';
  font-size: 28px;
  line-height: 1.14;
  letter-spacing: 1px;

  br {
    ${addStyleForTablet(`
      display: none;
    `)}
  }
`;

const VinDescription = styled.span`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

const VinExample = styled.span`
  line-height: 1.39;
  letter-spacing: 0.3px;
  font-size: 18px;
  font-family: 'Calibre-Semibold';
  margin: 20px 0;
  padding: 8px 39px;
  border: 1px solid #e7131a;
`;

const VinSeveralPlaces = styled.span`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

const VinLocationImg = styled.img`
  width: 296px;
  height: 112px;
  margin: 24px 0 27px;
`;

const VinLocationLists = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 0.3px;
  text-align: left;
`;

const VinLocationList = styled.div`
  text-align: left;

  &:first-child {
    margin-right: 18px;
  }
`;

const ListHeader = styled.span`
  font-family: 'Calibre-Semibold';
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

const ListContainer = styled.ul`
  margin: 0 0 0 10px;
  padding: 0;
  max-width: 242px;
`;

const ListItem = styled.li`
  position: relative;
  list-style-type: none;
`;

export default VinInformationDialog;
