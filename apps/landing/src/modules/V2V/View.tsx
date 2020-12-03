import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Header from '../V2V/components/Header';
import CarDetails from './components/CarDetails';
import Photo from './components/Photo';
import StickyBottom from './components/StickyBottom';
import ValueProps from './components/ValueProps';
import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import Footer from 'src/core/Footer';
import Icon, { Icons } from 'src/core/Icon';
import { Title } from 'src/core/Typography';

export interface Props {
  viewModel: ViewModel;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  flex-direction: column;
`;

const VehicleContainer = styled.div`
  max-width: 1312px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 32px;
  @media (min-width: 840px) {
    padding: 32px 64px;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    padding: 32px 16px;
    gap: 16px;
  }

  @media (max-width: 599px) {
    padding: 0px 0px 32px 0px;
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 96px 0;
  @media (max-width: 839px) {
    width: 100%;
    margin: 32px 16px;
  }
`;

const ErrorTitle = styled(Title.One)`
  margin-top: 8px;
  font-size: 36px;
  line-height: 40px;
`;

const CarsButton = styled(Button.Primary)`
  margin-top: 32px;
  @media (max-width: 839px) {
    width: 100%;
  }
`;

const NoVehicleIcon = styled(Icon)`
  display: block;
  margin-right: 16px;
`;

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <Header />
      <Container>
        {viewModel.ready() && (
          <>
            <VehicleContainer>
              <Photo />
              <CarDetails />
            </VehicleContainer>
          </>
        )}
        {viewModel.error() && (
          <ErrorContainer>
            <NoVehicleIcon icon={Icons.NO_VEHICLE} />
            <ErrorTitle>{viewModel.errorText}</ErrorTitle>
            <CarsButton onClick={viewModel.handleClick}>
              {viewModel.button}
            </CarsButton>
          </ErrorContainer>
        )}
        <ValueProps />
      </Container>
      <Footer />
      {viewModel.ready() && <StickyBottom />}
    </>
  );
};

export default observer(InventoryView);
