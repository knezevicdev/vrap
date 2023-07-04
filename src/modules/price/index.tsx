import React, { useEffect } from 'react';

import NextSteps from '../../components/NextSteps';
import PriceDetail from '../../components/PriceDetail';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
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

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          <PriceDetail />
        </PriceDetailContainer>
        <NextStepsContainer>
          <NextSteps />
        </NextStepsContainer>
      </PriceContainer>
    </HeroContainer>
  );
};

export default Price;
