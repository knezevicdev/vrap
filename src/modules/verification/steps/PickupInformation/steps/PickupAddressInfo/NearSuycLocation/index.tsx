import React, { useEffect, useMemo, useState } from 'react';

import AnalyticsHandler from '../../../../../../../integrations/AnalyticsHandler';
import useVerificationStore from '../../../../../store/store';
import { SuycLocation } from './fetchSuycLocation';
import {
  ButtonOutline,
  ButtonPrimary,
  ButtonSecondary,
  ButtonsWrapper,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogText,
  DialogTitle,
  Link,
} from './Style.css';
import useSubmitDropoffConfirmation from './useSubmitDropoffConfirmation';

interface Props {
  location: SuycLocation;
  onContinue: () => void;
}

const NearSuycLocation = ({ location, onContinue }: Props) => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  const vin = useVerificationStore((state) => state.vin);
  const offerEmail = useVerificationStore((state) => state.offerEmail);

  const { address, maps, hours, number } = location;
  const [showDropoffMessage, setShowDropoffMessage] = useState(false);

  const submitDropoffConfirmation = useSubmitDropoffConfirmation();

  const onConfirmationClick = () => {
    analyticsHandler.trackNearSUYCLocationModalYesCTAClicked(vin, offerEmail);
    submitDropoffConfirmation();
    setShowDropoffMessage(true);
  };

  const onCancelClick = () => {
    analyticsHandler.trackNearSUYCLocationModalNoCTAClicked(vin, offerEmail);
    onContinue();
  };

  useEffect(() => {
    analyticsHandler.trackNearSUYCLocationModalShown(vin, offerEmail);
  }, [analyticsHandler, offerEmail, vin]);

  return (
    <DialogOverlay>
      <Dialog>
        <DialogTitle>Bring your vehicle to us, Sell Your Car Today</DialogTitle>
        {showDropoffMessage && (
          <>
            <DialogContent>
              <DialogText>
                Great! We’ll be in touch. You do not need to complete this
                online form.
              </DialogText>
              <DialogText>We’ll call you shortly ({hours})</DialogText>
            </DialogContent>
            <ButtonOutline onClick={onContinue}>Continue</ButtonOutline>
          </>
        )}
        {!showDropoffMessage && (
          <>
            <DialogContent>
              <DialogText>
                <Link href={maps} target="_blank" rel="noreferrer">
                  {address}
                </Link>
              </DialogText>
              <DialogText>Hours: {hours}</DialogText>
              <DialogText>
                Number:{' '}
                <Link href={`tel:${number.replace(/\D/g, '')}`}>{number}</Link>
              </DialogText>
            </DialogContent>
            <ButtonsWrapper>
              <ButtonPrimary onClick={onConfirmationClick}>
                Yes, I’ll drop it off
              </ButtonPrimary>
              <ButtonSecondary onClick={onCancelClick}>
                No thanks, pick it up
              </ButtonSecondary>
            </ButtonsWrapper>
          </>
        )}
      </Dialog>
    </DialogOverlay>
  );
};

export default NearSuycLocation;
