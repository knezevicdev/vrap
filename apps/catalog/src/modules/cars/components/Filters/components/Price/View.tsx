import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Inputs from './components/Inputs';
import Slider from './components/Slider';
import PriceViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';
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
  const handleInputsChange = (value: MaxAndMin | undefined): void => {
    viewModel.handleInputsChange(value);
  };

  const handleSliderChange = (value: MaxAndMin | undefined): void => {
    viewModel.handleSliderChange(value);
  };

  const handleResetClick = (): void => {
    viewModel.handleResetClick();
  };

  const price = viewModel.getPrice();

  return (
    <Container>
      <Inputs
        onChange={handleInputsChange}
        range={viewModel.range}
        value={price}
      />
      <Slider
        onChange={handleSliderChange}
        range={viewModel.range}
        value={price}
      />
      <Reset
        button
        onClick={handleResetClick}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </Container>
  );
};

export default observer(PriceView);
