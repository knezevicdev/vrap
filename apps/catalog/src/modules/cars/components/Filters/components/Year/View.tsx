import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs from '../MaxAndMinInputs';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(() => ({
  flexDirection: 'column',
}));

interface Props {
  viewModel: ViewModel;
}
const YearView: React.FC<Props> = ({ viewModel }) => {
  const handleMaxAndMinInputsChange = (value?: MaxAndMin): void => {
    viewModel.handleMaxAndMinInputsChange(value);
  };

  const handleResetClick = (): void => {
    viewModel.handleResetClick();
  };

  return (
    <Container>
      <MaxAndMinInputs
        inputErrorLabel={viewModel.errorLabel}
        onChange={handleMaxAndMinInputsChange}
        range={viewModel.range}
        step={viewModel.step}
        value={viewModel.getMaxAndMinInputsValue()}
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

export default observer(YearView);
