import React from 'react';
import styled from 'styled-components';
import { Body, Title } from '@vroom-web/temp-ui-alias-for-checkout';

export interface DeliveryDetailsProps {
  data: {
    dates?: string[];
    receiver?: {
      name: string;
      phone: string;
    };
    truckInformation: string;
  };
  willYouBeAvailableLabel: string;
  truckHasAccessLabel: string;
  showReceiverInformation: boolean;
  showNotAvailableDates: boolean;
  showTruckInformation: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotAvailable = styled(Body.Regular)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const YouAvailable = styled(Body.Regular)`
  margin-top: 32px;
  margin-bottom: 8px;
`;

const Receiver = styled(Body.Regular)`
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  data,
  willYouBeAvailableLabel,
  truckHasAccessLabel,
  showReceiverInformation,
  showNotAvailableDates,
  showTruckInformation,
}) => {
  const { dates, receiver, truckInformation } = data;
  return (
    <Container>
      <Title.One>Additional delivery details</Title.One>
      {showNotAvailableDates && (
        <>
          <NotAvailable bold>Not available delivery dates</NotAvailable>
          {dates &&
            dates.map((date) => {
              return (
                <Body.Regular key={date}>
                  {new Date(date).toLocaleString()}
                </Body.Regular>
              );
            })}
        </>
      )}

      <YouAvailable bold>Will you be available for delivery?</YouAvailable>
      <Body.Regular>{willYouBeAvailableLabel}</Body.Regular>

      {showReceiverInformation && receiver && (
        <>
          <Receiver bold>Receiver Information</Receiver>
          <Body.Regular>{receiver.name}</Body.Regular>
          <Body.Regular>{receiver.phone}</Body.Regular>
        </>
      )}

      <Receiver bold>
        Can an 18-wheeler truck access your delivery address?
      </Receiver>
      <Body.Regular>{truckHasAccessLabel}</Body.Regular>

      {showTruckInformation && (
        <>
          <Receiver bold>
            What should we know about your street that might affect an
            18-wheeler truck from delivery to your address?
          </Receiver>
          <Body.Regular>{truckInformation}</Body.Regular>
        </>
      )}
    </Container>
  );
};

export default DeliveryDetails;
