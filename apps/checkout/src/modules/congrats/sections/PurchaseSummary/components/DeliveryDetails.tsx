import React from 'react';
import styled from 'styled-components';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';


interface Props {
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotAvailable = styled(Body.Regular)`
  font-weight: 600 !important;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const YouAvailable = styled(Body.Regular)`
  font-weight: 600 !important;
  margin-top: 32px;
  margin-bottom: 8px;
`;

const Receiver = styled(Body.Regular)`
  font-weight: 600 !important;
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DeliveryDetails: React.FC<Props> = () => {
  return (
    <Container>
      <Title.One>Additional delivery details</Title.One>
      <NotAvailable>Not available delivery dates</NotAvailable>
      <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>
      <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>
      <Body.Regular>04/01/2020 - 04/03/2020</Body.Regular>

      <YouAvailable>Will you be available for delivery?</YouAvailable>
      <Body.Regular>Yes</Body.Regular>

      <Receiver>Receiver Information</Receiver>
      <Body.Regular>Yes</Body.Regular>

      <Receiver>Can an 18-wheeler truck access your delivery address?</Receiver>
      <Body.Regular>Yes</Body.Regular>

      <Receiver>
        What should we know about your street that might affect an 18-wheeler
        truck from delivery to your address?
      </Receiver>
      <Body.Regular>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        venia
      </Body.Regular>
    </Container>
  );
};

export default DeliveryDetails;
