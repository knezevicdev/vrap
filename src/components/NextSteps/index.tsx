import React from 'react';

import usePriceStore from '../../modules/price/store';
import {
  CarImage,
  PriceExplanation,
  PriceExplanationContainer,
  PriceSubtitle,
  StyledLegal,
} from '../InitialPrice/Style.css';
import { Checkmark, Cross, ReducedPriceReason } from './Style.css';

const NextSteps = () => {
  const priceReductionReasons = usePriceStore(
    (state) => state.price.priceReductionReasons
  );

  return (
    <StyledLegal>
      <PriceSubtitle style={{ marginBottom: '16px', fontSize: '22px' }}>
        <CarImage /> Details about our offer
      </PriceSubtitle>
      {priceReductionReasons?.clean_vehicle_history && (
        <ReducedPriceReason>
          <Checkmark />
          <div>Clean Vehicle History</div>
        </ReducedPriceReason>
      )}
      {priceReductionReasons?.damage_history_found && (
        <ReducedPriceReason>
          <Cross />
          <div>Accident or Damage History Found</div>
        </ReducedPriceReason>
      )}
      {priceReductionReasons?.branded_title_history === false && (
        <ReducedPriceReason>
          <Checkmark />
          <div>Clean Title History</div>
        </ReducedPriceReason>
      )}
      {priceReductionReasons?.branded_title_history === true && (
        <ReducedPriceReason>
          <Cross />
          <div>Branded Title History Found</div>
        </ReducedPriceReason>
      )}
      <PriceExplanationContainer>
        <PriceExplanation>
          This price is based on data from thousands of similar market
          transactions, as well as the information you provided. Vroom may
          modify or revoke this price if the information you provided is
          inaccurate or if there is a significant present or prospective change
          in the used vehicle market beyond Vroom&apos;s control. Other terms
          and restrictions apply.
        </PriceExplanation>
      </PriceExplanationContainer>
    </StyledLegal>
  );
};

export default NextSteps;
