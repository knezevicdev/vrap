import React from 'react';

import { SuycLocation } from './fetchSuycLocation';
import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogText,
  DialogTitle,
  Link,
} from './Style.css';

interface Props {
  location: SuycLocation;
  onContinue: () => void;
}

const NearSuycLocation = ({ location, onContinue }: Props) => {
  const { address, maps, hours, number } = location;

  return (
    <DialogOverlay>
      <Dialog>
        <DialogTitle>Bring your vehicle to us, Sell Your Car Today</DialogTitle>
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
        <Button onClick={onContinue}>Continue</Button>
      </Dialog>
    </DialogOverlay>
  );
};

export default NearSuycLocation;
