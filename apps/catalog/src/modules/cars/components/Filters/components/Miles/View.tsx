import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Inputs from './components/Inputs';
import Slider from './components/Slider';
import MilesViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';
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

const MilesView: React.FC<Props> = ({ viewModel }) => {
  const handleResetClick = (): void => {
    viewModel.handleResetClick();
  };

  const handleInputsDone = (values: MaxAndMin | undefined): void => {
    viewModel.handleInputsDone(values);
  };

  const handleSliderDone = (values: MaxAndMin | undefined): void => {
    viewModel.handleSliderDone(values);
  };

  const state = viewModel.getState();

  return (
    <MilesContainer>
      <Inputs onDone={handleInputsDone} range={viewModel.range} state={state} />
      <Slider onDone={handleSliderDone} range={viewModel.range} state={state} />
      <Reset
        button
        onClick={handleResetClick}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </MilesContainer>
  );
};

export default observer(MilesView);
