import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import Inputs from './components/Inputs';
import Slider from './components/Slider';
import MilesViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const MilesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(() => ({
  flexDirection: 'column',
}));

interface Props {
  viewModel: MilesViewModel;
}

const Price: React.FC<Props> = ({ viewModel }) => {
  const { miles } = viewModel.getMilesFromUrl();

  return (
    <MilesContainer>
      <Inputs onDone={viewModel.onDone} state={miles} />
      <Slider onDone={viewModel.onDone} state={miles} />

      <Reset button onClick={viewModel.reset} disabled={!miles}>
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </MilesContainer>
  );
};

export default Price;
