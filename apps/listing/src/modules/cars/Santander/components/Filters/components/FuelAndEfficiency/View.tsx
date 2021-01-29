import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import FuelEfficiency from './FuelEfficiency';
import FuelType from './FuelType';
import FuelAndEfficiencyViewModel from './ViewModel';

const FuelAndEfficiencyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Reset = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  height: '36px',
  flexDirection: 'column',
  '&.MuiListItem-root.Mui-disabled >p': {
    color: theme.palette.grey['A100'],
  },
}));

const Titles = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 0, 0, 0),
  color: theme.palette.grey[700],
  fontFamily: 'Calibre, Arial, sans-serif',
  fontSize: '14px',
}));

const FuelEfficiencyTitles = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  padding: theme.spacing(1, 0),
  fontFamily: 'Calibre, Arial, sans-serif',
  fontSize: '14px',
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

interface Props {
  viewModel: FuelAndEfficiencyViewModel;
}

const FuelAndEfficiencyView: React.FC<Props> = ({ viewModel }) => {
  return (
    <FuelAndEfficiencyContainer>
      <Titles variant="caption">{viewModel.fuelTypeLabel}</Titles>
      <FuelType />
      <FuelEfficiencyTitles variant="caption">
        {viewModel.minimumFuelEfficiency}
      </FuelEfficiencyTitles>
      <FuelEfficiency />
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Value fontWeight={600} color="#257FA4">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </FuelAndEfficiencyContainer>
  );
};

export default observer(FuelAndEfficiencyView);