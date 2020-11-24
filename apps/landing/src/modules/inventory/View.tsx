import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import CarDetails from './components/CarDetails';
import Photo from './components/Photo';
import ViewModel from './ViewModel';

export interface Props {
  viewModel: ViewModel;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
`;

const VehicleContainer = styled.div`
  max-width: 1440px;
  margin: 32px 64px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 32px;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0 0 32px 0;
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      {viewModel.ready() && (
        <VehicleContainer>
          <Photo />
          <CarDetails />
        </VehicleContainer>
      )}
      {viewModel.error() && (
        <>
          <h1>Vehicle Not Found</h1>
        </>
      )}
    </Container>
  );
};

export default observer(InventoryView);
