import { Box, FormLabel } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import BedLength from './BedLength';
import CabinSize from './CabinSize';
import TowingCapacity from './TowingCapacity';
import TruckViewModel from './ViewModel';

const TruckContainer = withStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: theme.spacing(1),
  },
}))(Box);

const FormGroupLabel = withStyles((theme) => ({
  root: {
    fontSize: '14px',
    padding: theme.spacing(3, 0, 1, 0),
    color: theme.palette.grey[700],
  },
}))(FormLabel);

const CustomVerticalGradient = styled('div')(() => ({
  marginRight: '10px',
  width: '3px',
  background: 'linear-gradient(0deg, #999DA3, transparent)',
  height: '545px',
}));

interface Props {
  viewModel: TruckViewModel;
}

const TruckView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box display="flex">
      <CustomVerticalGradient />
      <TruckContainer
        id={viewModel.truckSubFilterId}
        key={viewModel.truckSubFilterId}
      >
        <FormGroupLabel>{viewModel.cabinSizeFilterLabel}</FormGroupLabel>
        <CabinSize />
        <FormGroupLabel>{viewModel.bedLengthFilterLabel}</FormGroupLabel>
        <BedLength />
        <FormGroupLabel>{viewModel.towingCapacityFilterLabel}</FormGroupLabel>
        <TowingCapacity />
      </TruckContainer>
    </Box>
  );
};

export default observer(TruckView);
