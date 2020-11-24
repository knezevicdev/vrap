import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { Body, Title } from 'src/core/Typography';
// import { Button } from 'src/core/Button';

export interface Props {
  viewModel: ViewModel;
}

const CarDetailsContainer = styled.div`
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 840px) {
    margin: 0;
  }
`;

const CarDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrimAndMiles = styled(Body.Regular)`
  font-weight: 400px;
`;

const Price = styled(Title.One)`
  margin-top: 8px;
  line-height: 40px;
`;

const TopFeatures = styled(Title.Three)`
  line-height: 24px;
`;

const Divider = styled.div`
  display: flex;
  min-height: 1px;
  max-height: 1px;
  background-color: #d6d7da;
  margin: 16px 0px;
`;

const VehicleDetailsButton = styled(Button.Primary)`
  margin: 0;
`;

const CarDetails: React.FC<Props> = ({ viewModel }) => {
  const { ymm, trim, miles, price } = viewModel.details();

  const { handleClick } = viewModel;

  return (
    <CarDetailsContainer>
      <CarDetailsSection>
        <Title.Two>{ymm}</Title.Two>
        <TrimAndMiles>
          {trim} | {miles}
        </TrimAndMiles>
        <Price>{price}</Price>
        <Divider />
        <TopFeatures>Top features yet to come</TopFeatures>
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
