import React from 'react';
import styled from 'styled-components';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';

export interface DeliveryDetailsProps {
  data: {
    dates?: string[];
    receiver: {
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
          <NotAvailable>Not available delivery dates</NotAvailable>
          {dates &&
            dates.map((date) => {
              return <Body.Regular key={date}>{date}</Body.Regular>;
            })}
        </>
      )}

      <YouAvailable>Will you be available for delivery?</YouAvailable>
      <Body.Regular>{willYouBeAvailableLabel}</Body.Regular>

      {showReceiverInformation && (
        <>
          <Receiver>Receiver Information</Receiver>
          <Body.Regular>{receiver.name}</Body.Regular>
          <Body.Regular>{receiver.phone}</Body.Regular>
        </>
      )}

      <Receiver>Can an 18-wheeler truck access your delivery address?</Receiver>
      <Body.Regular>{truckHasAccessLabel}</Body.Regular>

      {showTruckInformation && (
        <>
          <Receiver>
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
