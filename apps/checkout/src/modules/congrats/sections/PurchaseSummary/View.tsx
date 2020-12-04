import React from 'react';

import ViewModel from './ViewModel';
import styled from "styled-components";
import { Heading, Body, Title } from 'vroom-ui/src/foundation/Typography';
import {Picture} from "vroom-ui/src/elements/Picture";

interface Props {
    viewModel: ViewModel;
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  max-width: 640px;
`;

const Car = styled.div`
  display:flex;
  max-height: 104px;
`;

const CarInfo = styled.div`
  display:flex;
  flex-direction: column;
`;

const View: React.FC<Props> = () => {
    return (
        <Container>
          <Heading.Three>Purchase summary</Heading.Three>
          <Body.Small>Transaction placed on November 4, 2020</Body.Small>
          <Car>
              <Picture alt='car' src='/assets/car.png' width="182px" height="104px" />
            <CarInfo>
              <Title.Three>2018 Land Rover Range Rover Sport</Title.Three>
              <Body.Regular>SE</Body.Regular>
              <Body.Regular>20,818 miles</Body.Regular>
            </CarInfo>
          </Car>
        </Container>
    );
};

export default View;
