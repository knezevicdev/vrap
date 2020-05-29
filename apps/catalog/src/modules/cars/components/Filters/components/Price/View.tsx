import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Inputs from './components/Inputs';
import Slider from './components/Slider';
import PriceViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(() => ({
  flexDirection: 'column',
}));

interface Props {
  viewModel: PriceViewModel;
}
const PriceView: React.FC<Props> = ({ viewModel }) => {
  const { inputsState, sliderState } = viewModel.getStates();

  return (
    <Container>
      <Inputs onDone={viewModel.onDone} state={inputsState} />
      <Slider onDone={viewModel.onDone} state={sliderState} />

      <Reset button onClick={viewModel.reset} disabled={!inputsState}>
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </Container>
  );
};

export default observer(PriceView);
