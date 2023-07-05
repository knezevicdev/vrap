import { ProgressiveAd } from '@vroom-web/shared-components';
import { addStyleForMobile } from '@vroom-web/ui-lib';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { shallow } from 'zustand/shallow';

import { StoreStatus } from '../../interfaces.d';
import usePriceStore from '../price/store';

const ProgressiveAdC: React.FC = () => {
  const { automatedAppraisal, storeStatus } = usePriceStore(
    (state) => ({
      automatedAppraisal: state.price.automatedAppraisal,
      storeStatus: state.storeStatus,
    }),
    shallow
  );

  const isManualPricing = useMemo(() => {
    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }, []);

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

export default ProgressiveAdC;
