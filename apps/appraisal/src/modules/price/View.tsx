import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import React from 'react';

import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import PriceViewModel, { PriceStatus } from './ViewModel';

interface Props {
  viewModel: PriceViewModel;
}

const BackgroundContainer = styled(Container)(() => ({}));

const PriceContainer = styled('div')(() => ({
  border: '1px solid',
  display: 'flex',
  justifyContent: 'space-between',
}));

const PriceView: React.FC<Props> = ({ viewModel }) => {
  let priceComponent = <InitialPrice />;

  // somehow pass the viewModel into here?
  switch (viewModel.priceStatus) {
    case PriceStatus.INITIAL:
      priceComponent = <InitialPrice />;
      break;
  }

  return (
    <BackgroundContainer>
      <PriceContainer>
        {priceComponent}
        <NextSteps />
      </PriceContainer>
    </BackgroundContainer>
  );
};

export default PriceView;
