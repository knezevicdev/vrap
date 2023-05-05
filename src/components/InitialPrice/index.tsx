import { Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Icons } from '../../core/Icon';
import TaxSavingsDialog from '../../modules/verification/unified/components/TaxSavingsDialog';
import useTaxSavings from '../../modules/verification/unified/utils/useTaxSavings';
import { displayCurrency } from '../../utils';
import AuthModal from '../AuthModal/AuthModal';
import Spinner from '../Spinner';
import {
  Content,
  ContentText,
  FullButton,
  StickyContent,
  StickyDetails,
  StickyFooter,
  StyledButton,
  StyledContainer,
  StyledIcon,
  StyledLegal,
  TaxImportant,
  TaxLink,
  TaxSavings,
} from './Style.css';
import useInitialRegistrationData from './utils/useInitialRegistrationData';
import useOnContinueClick from './utils/useOnContinueClick';
import usePriceData from './utils/usePriceData';
import useStickyFooter from './utils/useStickyFooter';
import useVerificationUrl from './utils/useVerificationUrl';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

const InitialPrice: React.FC<{ store: PriceStore }> = ({ store }) => {
  useStickyFooter();
  const analyticsHandler = useRef(new AnalyticsHandler());

  useEffect(() => {
    analyticsHandler.current.trackPriceAutomated();
  }, []);

  const verificationUrl = useVerificationUrl(store);
  const priceData = usePriceData(store);
  const initialRegistrationData = useInitialRegistrationData(store);
  const { isAcceptingPrice, onContinueClick } = useOnContinueClick(
    analyticsHandler.current,
    verificationUrl
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  const onSuccessfulLogin = useCallback(() => {
    window.location.href = verificationUrl;
  }, [verificationUrl]);

  const [showDialog, setShowDialog] = useState(false);
  const { taxState, taxSavings } = useTaxSavings(
    store.price.price,
    store.price.zipcode
  );

  return (
    <>
      <StyledContainer>
        <Typography.Heading.Four>your price</Typography.Heading.Four>
        <Typography.Heading.One>{priceData.price}</Typography.Heading.One>
        <StyledIcon
          title="Car"
          titleId="heroIcon"
          icon={Icons.CAR_OFFER}
          aria-hidden="true"
        />

        <Content>
          <ContentText>
            This price expires on&nbsp;
            <b>{priceData.goodUntil}</b>
            &nbsp;or upon driving an additional&nbsp;
            <b>250 miles, </b>
            whichever occurs first. The&nbsp;
            <b>vehicle title </b>
            must be in your name.
          </ContentText>
        </Content>

        {taxSavings ? (
          <TaxSavings>
            You may be eligible to{' '}
            <TaxImportant>
              save {displayCurrency(taxSavings)} in sales tax
            </TaxImportant>{' '}
            by trading in.{' '}
            <TaxLink onClick={() => setShowDialog(true)}>Details</TaxLink>
          </TaxSavings>
        ) : null}

        <StyledButton
          id="priceDetails"
          onClick={async () => {
            const isSignedIn = await onContinueClick();

            if (!isSignedIn) {
              setShowAuthModal(true);
            }
          }}
          disabled={isAcceptingPrice}
        >
          {isAcceptingPrice ? <Spinner /> : 'continue'}
        </StyledButton>

        <StyledLegal>
          <Typography.Body.Small>
            This price is based on data from thousands of similar market
            transactions, as well as the information you provided. Vroom may
            modify or revoke this price if the information you provided is
            inaccurate or if there is a significant present or prospective
            change in the used vehicle market beyond Vroom&apos;s control. Other
            terms and restrictions apply.
          </Typography.Body.Small>
        </StyledLegal>

        <StickyFooter id="stickyFooter">
          <StickyContent>
            <StickyDetails>
              <Typography.Title.Three>Your Price:</Typography.Title.Three>
              <Typography.Heading.Four>
                {priceData.price}
              </Typography.Heading.Four>
            </StickyDetails>
            <FullButton
              onClick={async () => {
                const isSignedIn = await onContinueClick();

                if (!isSignedIn) {
                  setShowAuthModal(true);
                }
              }}
              disabled={isAcceptingPrice}
            >
              {isAcceptingPrice ? <Spinner /> : 'continue'}
            </FullButton>
          </StickyContent>
        </StickyFooter>
      </StyledContainer>
      {showAuthModal && (
        <AuthModal
          onSuccessfulLogin={onSuccessfulLogin}
          redirectUrl={verificationUrl}
          email={priceData.userEmail}
          initialRegistrationData={initialRegistrationData}
        />
      )}
      {showDialog && (
        <TaxSavingsDialog
          taxSavings={taxSavings}
          taxState={taxState}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default observer(InitialPrice);
