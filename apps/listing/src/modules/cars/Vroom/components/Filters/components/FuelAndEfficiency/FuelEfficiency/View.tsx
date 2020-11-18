import { styled } from '@material-ui/core/styles';
import { FuelEfficiency } from '@vroom-web/catalog-url-integration';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import MaxAndMinInputs, { Variant } from '../../MaxAndMinInputs';
import FuelEfficiencyViewModel from './ViewModel';

const FuelEfficiencyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: theme.spacing(2),
}));

const MPGHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1),
}));

interface Props {
  viewModel: FuelEfficiencyViewModel;
}

const MilesView: React.FC<Props> = ({ viewModel }) => {
  const handleMaxAndMinInputsChange = (values?: FuelEfficiency): void => {
    viewModel.handleSliderDone(
      viewModel.updateFiltersDataFuelEfficiency,
      values
    );
  };

  return (
    <FuelEfficiencyContainer>
      <MPGHeader color={viewModel.getFuelEfficiencyData().color}>
        {viewModel.getFuelEfficiencyData().label}
      </MPGHeader>
      <MaxAndMinInputs
        showInput={false}
        inputErrorLabel={viewModel.errorLabel}
        onChange={handleMaxAndMinInputsChange}
        range={viewModel.range}
        step={viewModel.step}
        variant={Variant.MIN_ONLY}
        value={viewModel.getMaxAndMinInputsValue()}
      />
    </FuelEfficiencyContainer>
  );
};

export default observer(MilesView);
