import { ProgressiveAd } from '@vroom-web/shared-components';
import { addStyleForMobile } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { StoreStatus } from '../../interfaces.d';
import { PriceStore } from '../price/store';

const ProgressiveAdC: React.FC<{ store: PriceStore }> = ({ store }) => {
  const isManualPricing = useMemo(() => {
    const {
      storeStatus,
      /* eslint-disable-next-line */
      price: { automatedAppraisal },
    } = store;

    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }, [store]);

  if (isManualPricing) {
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

export default observer(ProgressiveAdC);
