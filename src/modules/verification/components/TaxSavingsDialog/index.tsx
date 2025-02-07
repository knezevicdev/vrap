import { Link } from '@vroom-web/ui-lib';
import React, { useRef } from 'react';

import Dialog from '../Dialog';
import {
  ButtonWrapper,
  DialogImportnat,
  DialogText,
  DialogTitle,
} from './Style.css';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { displayCurrency } from 'src/utils';

const TaxSavingsDialog: React.FC<{
  taxSavings: number;
  taxState: string;
  onClose: () => void;
}> = ({ taxSavings, taxState, onClose }) => {
  const analyticsHandler = useRef(new AnalyticsHandler());

  return (
    <Dialog onClose={onClose}>
      <DialogTitle>How you can save?</DialogTitle>
      <DialogText>
        You may be eligible to pay much less in sales tax by trading in. How
        much you save depends on your state’s sales tax and the value of your
        trade in.
        <br />
        <br />
        We estimate that{' '}
        <DialogImportnat>
          you can save appx. {displayCurrency(taxSavings)} in {taxState} sales
          tax
        </DialogImportnat>
        .
      </DialogText>
      <ButtonWrapper>
        <Link.Primary
          href="/cars"
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            analyticsHandler.current.trackVerificationTaxModalCTAClicked();
            window.open('/cars', '_blank');
          }}
        >
          Find your car
        </Link.Primary>
      </ButtonWrapper>
    </Dialog>
  );
};

export default TaxSavingsDialog;
