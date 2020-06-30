import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs from '../MaxAndMinInputs';
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
  const handleMaxAndMinInputsChange = (value?: MaxAndMin): void => {
    viewModel.handleMaxAndMinInputsChange(value);
  };

  const handleResetClick = (): void => {
    viewModel.handleResetClick();
  };

  const price = viewModel.getPrice();

  return (
    <Container>
      <MaxAndMinInputs
        inputStartAdornment={
          <InputAdornment position="start">$</InputAdornment>
        }
        inputErrorLabel={viewModel.errorLabel}
        onChange={handleMaxAndMinInputsChange}
        range={viewModel.range}
        step={viewModel.step}
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
