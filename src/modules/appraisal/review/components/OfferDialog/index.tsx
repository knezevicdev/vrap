import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';

import { displayCurrency } from '../../../../../utils';
import { MONTHS, WEEKDAYS } from './data';
import {
  AcceptButton,
  Cancel,
  Content,
  DialogContainer,
  DialogTitle,
  Legal,
  LegalContainer,
  Overlay,
  Price,
} from './Style.css';
import useAcceptDeclinePrice from './useAcceptDeclinePrice';

import { useAppStore } from 'src/context';

const OfferDialog: React.FC = () => {
  const { store } = useAppStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const hasValidPrice = useMemo(() => {
    const expirationDate = store.offer.offerDetail?.offerExpiration;
    return !!expirationDate && new Date(expirationDate) > new Date();
  }, [store.offer.offerDetail?.offerExpiration]);

  const price = useMemo(() => {
    const price = store.offer.offerDetail?.price;

    if (price) return displayCurrency(price);

    return '';
  }, [store.offer.offerDetail?.price]);

  const expirationDate = useMemo(() => {
    const expirationDate = store.offer.offerDetail?.offerExpiration;

    if (expirationDate) {
      const isoDateTime = new Date(expirationDate);
      const day = WEEKDAYS[isoDateTime.getDay()].label;
      const month = MONTHS[isoDateTime.getMonth()].label;
      const date = isoDateTime.getDate();
      return `${day}, ${month} ${date}`;
    }

    return '';
  }, [store.offer.offerDetail?.offerExpiration]);

  const { acceptPrice, declinePrice } = useAcceptDeclinePrice(
    hasValidPrice,
    store
  );

  return (
    <Overlay>
      <DialogContainer data-qa="AppraisalOfferDialog">
        <DialogTitle hasValidPrice={hasValidPrice}>
          {hasValidPrice
            ? 'Your offer'
            : 'Thanks for submitting your appraisal'}
        </DialogTitle>
        {hasValidPrice && <Price>{price}</Price>}
        {hasValidPrice && (
          <Content>
            This price expires on&nbsp;
            <b>{expirationDate}</b>
            &nbsp;or upon driving an additional <b>250 miles</b>, whichever
            occurs &nbsp;first. The &nbsp;<b>vehicle title </b>
            &nbsp;must be in your name.
          </Content>
        )}
        {!hasValidPrice && (
          <>
            <Content>Our buying specialists are taking a closer look.</Content>
            <Content freeForm>
              <b>In the meantime, things to know:</b>
              <ul>
                <li>
                  Our team will send you a price for your car within 1 business
                  day.
                </li>
                <li>
                  To guarantee this purchase, please continue and we can apply
                  your trade-in value with one of our car specialists later.
                </li>
              </ul>
            </Content>
          </>
        )}
        <AcceptButton onClick={acceptPrice} hasValidPrice={hasValidPrice}>
          {hasValidPrice ? 'Apply to purchase' : 'Continue Purchase'}
        </AcceptButton>
        {hasValidPrice && (
          <Cancel onClick={declinePrice}>Continue without applying</Cancel>
        )}
        {hasValidPrice && (
          <LegalContainer>
            <Legal>
              *This price is based on data from thousands of similar market
              transactions, as well as the information you provided. Vroom may
              modify or revoke this price if the information you provided is
              inaccurate or if there is a significant present or prospective
              change in the used vehicle market beyond Vroom&apos;s Control.
              Other terms and restrictions apply.
            </Legal>
          </LegalContainer>
        )}
      </DialogContainer>
    </Overlay>
  );
};

export default observer(OfferDialog);
