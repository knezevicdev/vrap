import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Favorites from '../Favorites';
import VehicleDetailsButton from '../VehicleDetailsButton';
import ViewModel from './ViewModel';

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

const Features = styled(Title.Three)`
  line-height: 24px;
`;

const ListItem = styled.li`
  line-height: 30px;
`;

const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  @media (max-width: 839px) {
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
  }
`;

const ButtonSection = styled.div`
  text-align: center;
`;

const CarDetails: React.FC<Props> = ({ viewModel }) => {
  const { ymm, trim, miles, price } = viewModel.details();
  const topFeatures = viewModel.topFeatures();

  return (
    <CarDetailsContainer>
      <div>
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
          <Features>Top Features</Features>
          <List>
            {topFeatures.map((feature: string, idx: number) => (
              <ListItem key={idx}>
                <Body.Regular>{feature}</Body.Regular>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <ButtonSection>
        <VehicleDetailsButton />
        <Favorites />
      </ButtonSection>
    </CarDetailsContainer>
  );
};

export default observer(CarDetails);
