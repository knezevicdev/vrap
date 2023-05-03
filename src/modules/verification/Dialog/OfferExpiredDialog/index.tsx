import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';

import { useAppStore } from '../../../../context';
import {
  Container,
  GetUpdatedCTA,
  Line,
  Modal,
  PriceExpiredContent,
  PriceExpiredDesc,
  PriceExpiredImage,
  PriceExpiredTitle,
} from './Style.css';

interface Props {
  vin: string;
}
const OfferExpiredDialog: React.FC<Props> = ({ vin }) => {
  const router = useRouter();
  const { store } = useAppStore();

  const handleGetUpdatedCTA = () => {
    router
      .push({
        pathname: store.appraisal.appraisalPath,
        query: { vehicle: vin, ...router.query },
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container>
      <Modal>
        <PriceExpiredContent>
          <PriceExpiredImage />
          <PriceExpiredTitle>
            <div>your price has expired</div>
          </PriceExpiredTitle>
          <Line />
          <PriceExpiredDesc>
            No need to worry! You can always get an updated price by clicking
            the link below.
          </PriceExpiredDesc>
          <GetUpdatedCTA onClick={handleGetUpdatedCTA}>
            get updated price
          </GetUpdatedCTA>
        </PriceExpiredContent>
      </Modal>
    </Container>
  );
};

export default observer(OfferExpiredDialog);
