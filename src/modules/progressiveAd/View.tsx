import { ProgressiveAd } from '@vroom-web/shared-components';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const PriceView: React.FC<Props> = ({ viewModel }) => {
  if (viewModel.showProgressiveAd) {
    return (
      <ProgressiveWrapper>
        <ProgressiveAd
          eventName={viewModel.eventName}
          placementCode={viewModel.placementCode}
          category={viewModel.category}
        />
      </ProgressiveWrapper>
    );
  } else return <></>;
};

const ProgressiveWrapper = styled.div`
  text-align: center;
  margin: 0 100px 24px;

  @media (max-width: 1024px) {
    margin: 0 40px 24px;
  }

  @media (max-width: 768px) {
    margin: 0 20px 24px;
  }
`;

export default observer(PriceView);
