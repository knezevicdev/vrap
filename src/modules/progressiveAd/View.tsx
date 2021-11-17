import { ProgressiveAd } from '@vroom-web/shared-components';
import { addStyleForMobile } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  const {
    showProgressiveAd,
    isInProgressiveExperiment,
    placementCode,
    placementName,
    category,
    headline,
  } = viewModel;
  if (showProgressiveAd) {
    return (
      <ProgressiveWrapper>
        {isInProgressiveExperiment ? (
          <ProgressiveAd
            placementName={placementName}
            placementCode={placementCode}
            category={category}
            headline={headline}
            version={2}
          />
        ) : (
          <ProgressiveAd
            placementName={placementName}
            placementCode={placementCode}
            category={category}
            version={1}
          />
        )}
      </ProgressiveWrapper>
    );
  } else return <></>;
};

const ProgressiveWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1360px;
  width: 100%;
  padding: 0px 40px;
  margin: 0 auto 50px;

  ${addStyleForMobile(`
    margin: 0;
    padding: 0 20px;
  `)}
`;

export default observer(PriceView);
