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
  if (viewModel.showProgressiveAd) {
    return (
      <ProgressiveWrapper>
        <ProgressiveAd
          placementName="SUYC Price"
          placementCode={2871300002}
          category="sell"
          headline="Switch Today and Save!"
          version={2}
        />
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
