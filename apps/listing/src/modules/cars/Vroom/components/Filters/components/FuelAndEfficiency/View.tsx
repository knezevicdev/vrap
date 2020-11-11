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
  fontSize: '16px',
  padding: theme.spacing(1, 0),
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
      {viewModel.showFuelTypeFilter() && (
        <>
          <Titles fontWeight="fontWeightMedium">
            {viewModel.fuelTypeLabel}
          </Titles>
          <FuelType />
        </>
      )}
      {viewModel.showFuelEfficiencyFilter() && (
        <>
          <Titles fontWeight="fontWeightMedium">
            {viewModel.minimumFuelEfficiency}
          </Titles>
          <FuelEfficiency />
        </>
      )}
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </FuelAndEfficiencyContainer>
  );
};

export default observer(FuelAndEfficiencyView);
