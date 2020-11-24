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
  background-color: #f5f5f5;
`;

const VehicleContainer = styled.div`
  margin: 32px auto;
  display: flex;
  flex-wrap: wrap;
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
