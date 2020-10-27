import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import FuelAndEfficiencyViewModel from './ViewModel';

const FuelAndEfficiencyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const Titles = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  padding: theme.spacing(1, 0),
}));

interface Props {
  viewModel: FuelAndEfficiencyViewModel;
}

const FuelAndEfficiencyView: React.FC<Props> = ({ viewModel }) => {
  return (
    <FuelAndEfficiencyContainer>
      <Titles fontWeight="fontWeightMedium">{viewModel.fuelTypeLabel}</Titles>
      <Titles fontWeight="fontWeightMedium">
        {viewModel.minimumFuelEfficiency}
      </Titles>
    </FuelAndEfficiencyContainer>
  );
};

export default observer(FuelAndEfficiencyView);
