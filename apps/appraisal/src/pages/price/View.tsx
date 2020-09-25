import React from 'react';

import InitialPrice from './components/InitialPrice';
import NextSteps from './components/NextSteps';
import ViewModel, { PriceStatus } from './ViewModel';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@vroom-web/ui';
import { styled, useTheme } from '@material-ui/core/styles';

interface Props {
  viewModel: ViewModel;
}

const BackgroundContainer = styled(Container)(({ theme }) => ({
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
