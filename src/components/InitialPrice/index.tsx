import { Typography } from '@vroom-web/ui-lib';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { Icons } from '../../core/Icon';
import usePriceStore from '../../modules/price/store';
import TaxSavingsDialog from '../../modules/verification/components/TaxSavingsDialog';
import useTaxSavings from '../../modules/verification/utils/useTaxSavings';
import { displayCurrency } from '../../utils';
import AuthModal from '../AuthModal/AuthModal';
import Spinner from '../Spinner';
import {
  CarImage,
  Content,
  ContentText,
  FullButton,
  PriceExplanation,
  PriceExplanationContainer,
  PriceSubtitle,
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

const InitialPrice: React.FC = () => {
  useStickyFooter();
  const analyticsHandler = useRef(new AnalyticsHandler());

  useEffect(() => {
    analyticsHandler.current.trackPriceAutomated();
  }, []);

  const verificationUrl = useVerificationUrl();
  const priceData = usePriceData();
  const initialRegistrationData = useInitialRegistrationData();
  const { isAcceptingPrice, onContinueClick } = useOnContinueClick(
    analyticsHandler.current,
    verificationUrl
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  const onSuccessfulLogin = useCallback(() => {
    window.location.href = verificationUrl;
  }, [verificationUrl]);

  const [showDialog, setShowDialog] = useState(false);
  const { price, zipcode } = usePriceStore(
    (state) => ({
      price: state.price.price,
      zipcode: state.price.zipcode,
    }),
    shallow
  );
  const { taxState, taxSavings } = useTaxSavings(price, zipcode);

  const showLowPriceNotice = price < 1000;

  return (
    <>
      <StyledContainer>
        <Typography.Heading.Three>your price</Typography.Heading.Three>
        {showLowPriceNotice && (
          <PriceSubtitle>
            Your ride’s a little outside our specialty
          </PriceSubtitle>
        )}
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
              save appx. {displayCurrency(taxSavings)} in sales tax
            </TaxImportant>{' '}
            by trading in.{' '}
            <TaxLink
              onClick={() => {
                analyticsHandler.current.trackVerificationTaxPricePageDetailsClicked();
                setShowDialog(true);
              }}
            >
              Details
            </TaxLink>
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
          {isAcceptingPrice ? <Spinner /> : 'save and continue'}
        </StyledButton>

        {showLowPriceNotice && (
          <StyledLegal>
            <PriceSubtitle>
              <CarImage /> Details about our offer
            </PriceSubtitle>
            <PriceExplanationContainer>
              <PriceExplanation>
                Our offer price might not meet your expectations, but it is
                based on thousands of similar market transactions. Some rides
                with title issues, distinct histories, higher mileage or older
                model years typically aren’t the best fit for us.
              </PriceExplanation>
            </PriceExplanationContainer>
          </StyledLegal>
        )}
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

export default InitialPrice;
