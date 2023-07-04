import { useRouter } from 'next/router';
import React from 'react';

import useAppraisalStore from '../../../../store/appraisalStore';
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

  const handleGetUpdatedCTA = () => {
    router
      .push({
        pathname: useAppraisalStore.getState().appraisalPath(),
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

export default OfferExpiredDialog;
