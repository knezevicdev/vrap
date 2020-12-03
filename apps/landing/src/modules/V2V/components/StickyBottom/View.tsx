import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import VehicleDetailsButton from '../VehicleDetailsButton';
import HeaderViewModel from './ViewModel';

import { Title } from 'src/core/Typography';

const Container = styled.div`
  @media (min-width: 599px) {
    display: none;
  }
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  position: sticky;
  bottom: 0px;
  z-index: 1;
`;

const StickyBottom = styled.div`
  padding: 16px 16px 16px;
`;

const VehicleDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

interface Props {
  viewModel: HeaderViewModel;
}

const StickyBottomView: React.FC<Props> = ({ viewModel }) => {
  const { pageThreshold } = viewModel;
  const { ymm, price } = viewModel.details();
  const [showStickyBottom, setShowStickyBottom] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = (): void => {
        const pos = window.pageYOffset;
        console.log(pos);

        pos > pageThreshold
          ? setShowStickyBottom(true)
          : setShowStickyBottom(false);
      };
    }
  }, [showStickyBottom, pageThreshold]);

  return (
    <Container>
      {showStickyBottom && (
        <StickyBottom>
          <VehicleDetails>
            <Title.Two>{ymm}</Title.Two>
            <Title.Two>{price}</Title.Two>
          </VehicleDetails>
          <VehicleDetailsButton />
        </StickyBottom>
      )}
    </Container>
  );
};

export default StickyBottomView;
