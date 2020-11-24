import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { Body, Title } from 'src/core/Typography';

export interface Props {
  viewModel: ViewModel;
}

const CarDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

const CarDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d6d7da;
  padding-bottom: 16px;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TrimAndMiles = styled(Body.Regular)`
  display: block;
  font-weight: 400px;
`;

const PriceSection = styled.div`
  margin-top: 8px;
`;

const Price = styled(Title.One)`
  line-height: 40px;
`;

const VehicleDetailsButton = styled(Button.Primary)`
  width: 100%;
  margin: 0;
`;

const CarDetails: React.FC<Props> = ({ viewModel }) => {
  const { ymm, trim, miles, price } = viewModel.details();

  const { handleClick } = viewModel;

  return (
    <CarDetailsContainer>
      <CarDetailsSection>
        <div>
          <Title.Two>{ymm}</Title.Two>
          <TrimAndMiles>
            {trim} | {miles}
          </TrimAndMiles>
        </div>
        <PriceSection>
          <Price>{price}</Price>
        </PriceSection>
      </CarDetailsSection>
      <div>
        <VehicleDetailsButton onClick={handleClick}>
          See all vehicle details
        </VehicleDetailsButton>
      </div>
    </CarDetailsContainer>
  );
};

export default observer(CarDetails);
