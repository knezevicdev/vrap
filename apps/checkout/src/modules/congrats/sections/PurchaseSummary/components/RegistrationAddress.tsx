import React from 'react';
import styled from 'styled-components';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';


interface Props {
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleHeader = styled(Title.One)`
  margin-bottom: 8px;
`;

const RegistrationAddress: React.FC<Props> = () => {
  return (
    <Container>
      <TitleHeader>Registration address</TitleHeader>
      <Body.Regular>Paul Henry</Body.Regular>
      <Body.Regular>1021 Monterey Salinas Hwy</Body.Regular>
      <Body.Regular>Salina, CA 93980</Body.Regular>
    </Container>
  );
};

export default RegistrationAddress;
