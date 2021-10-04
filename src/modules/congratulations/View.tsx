import { ProgressiveAd } from '@vroom-web/shared-components';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import CongratulationsViewModel from './ViewModel';

import CongratsCard from 'src/components/CongratsCard';
import CongratsNextSteps from 'src/components/CongratsNextSteps';
import ENVS from 'src/integrations/Envs';

interface Props {
  viewModel: CongratulationsViewModel;
}

const CongratulationsView = ({ viewModel }: Props): JSX.Element => {
  useEffect(() => {
    viewModel.onPageLoad();
  }, [viewModel]);

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
      {viewModel.showProgressiveAd && (
        <ProgressiveWrapper>
          <ProgressiveAd
            eventName={viewModel.eventName}
            placementCode={viewModel.placementCode}
            category={viewModel.category}
          />
        </ProgressiveWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f5f5f5;
`;

const HeroContainer = styled.div`
  background-size: 100% 40%;
  background-repeat: no-repeat;
  background-image: url('${ENVS.BASE_PATH}/images/offer-hero.png');
  width: 100%;
  flex: 1;

  @media (max-width: 768px) {
    background-size: 100% 200px;
    background-image: url('${ENVS.BASE_PATH}/images/offer-hero.png');
  }
`;

const CongratsContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  position: relative;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CongratsDetailContainer = styled.div`
  margin-top: 56px;
  background-color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.15);
  flex-basis: 60%;
  padding: 50px;
  z-index: 1;
  margin: 24px;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const ProgressiveWrapper = styled.div`
  text-align: center;
  margin: 0 24px 24px;
`;

export default observer(CongratulationsView);
