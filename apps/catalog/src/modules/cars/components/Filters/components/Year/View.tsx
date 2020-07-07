import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { MaxAndMin } from '@vroom-web/catalog-url-integration';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs from '../MaxAndMinInputs';
import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(({ theme }) => ({
  flexDirection: 'column',
  '&.MuiListItem-root.Mui-disabled >p': {
    color: theme.palette.grey['A100'],
  },
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
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
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </Container>
  );
};

export default observer(YearView);
