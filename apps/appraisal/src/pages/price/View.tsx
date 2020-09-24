import React from 'react';

import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import ViewModel, { PriceStatus } from './ViewModel';
import { Typography } from '@vroom-web/ui';
import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';

interface Props {
  viewModel: ViewModel;
}

const BackgroundContainer = styled('div')(() => ({
  margin: '50px',
}));

const PriceContainer = styled('div')(() => ({
  border: '1px solid',
  display: 'flex',
  justifyContent: 'space-between',
}));

const PriceView: React.FC<Props> = ({ viewModel }) => {
  let priceComponent = <InitialPrice />;

  switch(viewModel.priceStatus) {
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
}


export default PriceView;
