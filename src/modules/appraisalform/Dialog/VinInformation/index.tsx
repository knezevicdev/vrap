import getConfig from 'next/config';
import React from 'react';
const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;
import {
  CloseButtonContainer,
  CloseDialog,
  Container,
  ListContainer,
  ListHeader,
  ListItem,
  Modal,
  StyledIcon,
  Title,
  VinDescription,
  VinExample,
  VinLocationImg,
  VinLocationList,
  VinLocationLists,
  VinSeveralPlaces,
} from './Style.css';

import { Icons } from 'src/core/Icon';

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
  const baseImg = `${BASE_PATH}/images/where-is-vin`;

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      closeModalHandler();
    }
  };

  return (
    <Container data-qa="VinInformationDialog">
      <Modal>
        <CloseDialog
          onClick={(): void => closeModalHandler()}
          onKeyDown={handleOnKeyDown}
          data-qa="exact milage close"
          role="button"
          tabIndex={0}
        >
          <CloseButtonContainer>
            <StyledIcon icon={Icons.ClOSE_LARGE} />
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
              {onCarList.map((element) => (
                <ListItem key={element}>{element}</ListItem>
              ))}
            </ListContainer>
          </VinLocationList>
          <VinLocationList>
            <ListHeader>In Your Documentation</ListHeader>
            <ListContainer className="in-docs">
              {inDocsList.map((element) => (
                <ListItem key={element}>{element}</ListItem>
              ))}
            </ListContainer>
          </VinLocationList>
        </VinLocationLists>
      </Modal>
    </Container>
  );
};

export default VinInformationDialog;
