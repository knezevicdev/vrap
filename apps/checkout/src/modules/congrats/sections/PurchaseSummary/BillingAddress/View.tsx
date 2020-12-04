import React from 'react';

import ViewModel from './ViewModel';
import {Body, Title} from "vroom-ui/src/foundation/Typography";
import styled from "styled-components";

interface Props {
  viewModel: ViewModel;
}
const Container = styled.div`
  display:flex;
  flex-direction: column;
`;


const View: React.FC<Props> = () => {
  return (
      <Container>
        <Title.One>Billing address</Title.One>
        <Body.Regular>Paul Henry</Body.Regular>
        <Body.Regular>1021 Monterey Salinas Hwy</Body.Regular>
        <Body.Regular>Salina, CA 93980</Body.Regular>
      </Container>
  );
};

export default View;
