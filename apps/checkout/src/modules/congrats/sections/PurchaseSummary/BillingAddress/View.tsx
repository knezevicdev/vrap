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

const TitleHeader = styled(Title.One)`
    margin-bottom: 8px;
`;

const View: React.FC<Props> = () => {
  return (
      <Container>
        <TitleHeader>Billing address</TitleHeader>
        <Body.Regular>Paul Henry</Body.Regular>
        <Body.Regular>1021 Monterey Salinas Hwy</Body.Regular>
        <Body.Regular>Salina, CA 93980</Body.Regular>
      </Container>
  );
};

export default View;
