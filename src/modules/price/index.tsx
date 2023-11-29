import React, { useEffect } from 'react';

import NextSteps from '../../components/NextSteps';
import PriceDetail from '../../components/PriceDetail';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import { StoreStatus } from '../../interfaces.d';
import usePriceStore from './store';
import {
  HeroContainer,
  NextStepsContainer,
  PriceContainer,
  PriceDetailContainer,
} from './Style.css';

const Price: React.FC = () => {
  useEffect(() => {
    new AnalyticsHandler().trackPriceViewed();
  }, []);

  const storeStatus = usePriceStore((state) => state.storeStatus);
  const isAutomatedAppraisal = usePriceStore(
    (state) => state.price.automatedAppraisal
  );

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          <PriceDetail />
        </PriceDetailContainer>
        {storeStatus === StoreStatus.Success && isAutomatedAppraisal && (
          <NextStepsContainer>
            <NextSteps />
          </NextStepsContainer>
        )}
      </PriceContainer>
    </HeroContainer>
  );
};

export default Price;
