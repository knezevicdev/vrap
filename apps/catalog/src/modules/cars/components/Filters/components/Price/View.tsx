import InputAdornment from '@material-ui/core/InputAdornment';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { MaxAndMin } from '@vroom-web/catalog-url-integration';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs from '../MaxAndMinInputs';
import PriceViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(() => ({
  flexDirection: 'column',
}));

const Value = styled(Typography)(() => ({
    fontSize: '16px',
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
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </Container>
  );
};

export default observer(PriceView);
