import { observer } from 'mobx-react';
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

import { PriceStore } from 'src/modules/price/store';

const Price: React.FC<{ store: PriceStore }> = ({ store }) => {
  useEffect(() => {
    new AnalyticsHandler().trackPriceViewed();
  }, []);

  return (
    <HeroContainer>
      <PriceContainer>
        <PriceDetailContainer>
          <PriceDetail store={store} />
        </PriceDetailContainer>
        <NextStepsContainer>
          <NextSteps />
        </NextStepsContainer>
      </PriceContainer>
    </HeroContainer>
  );
};

export default observer(Price);
