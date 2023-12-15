import { SpinnerColor, SpinnerSize, VroomSpinner } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import useDealStore from '../../../store/dealStore';

const DealLoader = () => {
  const isLoading = useDealStore((state) => state.loading);

  if (!isLoading) return null;

  return (
    <WhiteBox>
      <SpinnerContainer>
        <VroomSpinner
          size={SpinnerSize.MD}
          color={SpinnerColor.PRIMARY_BRAND}
          showBrand={true}
          showLoadingText={false}
          loadingText="loading..."
        />
      </SpinnerContainer>
    </WhiteBox>
  );
};

export default DealLoader;

const WhiteBox = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;
