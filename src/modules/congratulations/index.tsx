import { ProgressiveAd } from '@vroom-web/shared-components';
import React, { useEffect } from 'react';

import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import {
  CongratsContainer,
  CongratsDetailContainer,
  Container,
  HeroContainer,
  ProgressiveWrapper,
} from './Style.css';

import CongratsCard from 'src/components/CongratsCard';
import CongratsNextSteps from 'src/components/CongratsNextSteps';

const Congratulations = (): JSX.Element => {
  useEffect(() => {
    new AnalyticsHandler().trackCongratsViewed();
  }, []);

  return (
    <Container>
      <HeroContainer>
        <CongratsContainer>
          <CongratsDetailContainer>
            <CongratsCard />
          </CongratsDetailContainer>
        </CongratsContainer>
        <CongratsNextSteps />
      </HeroContainer>
      <CongratsContainer>
        <ProgressiveWrapper>
          <ProgressiveAd
            placementName="SUYC Congrats"
            placementCode={2871300002}
            category="sell"
            headline="Switch Today and Save!"
            version={2}
            description="Compare auto insurance rates side by side on the site ranked #1 for ease of use."
            specialText="Featured Offer"
          />
        </ProgressiveWrapper>
      </CongratsContainer>
    </Container>
  );
};

export default Congratulations;
