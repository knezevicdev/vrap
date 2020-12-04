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

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const View: React.FC<Props> = () => {
  return (
      <Container>
        <Title.One>Additional delivery details</Title.One>
        <BodyRegularBold>Not available delivery dates</BodyRegularBold>
        <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>
        <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>
        <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>

        <BodyRegularBold>Will you be available for delivery?</BodyRegularBold>
        <Body.Regular>Yes</Body.Regular>

        <BodyRegularBold>Receiver Information</BodyRegularBold>
        <Body.Regular>Yes</Body.Regular>

        <BodyRegularBold>Can an 18-wheeler truck access your delivery address?</BodyRegularBold>
        <Body.Regular>Yes</Body.Regular>

        <BodyRegularBold>What should we know about your street that might affect an 18-wheeler truck from delivery to your address?</BodyRegularBold>
        <Body.Regular>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia</Body.Regular>
      </Container>
  );
};

export default View;
