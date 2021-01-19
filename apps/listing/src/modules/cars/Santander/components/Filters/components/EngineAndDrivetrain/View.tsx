import { ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Cylinders from './Cylinders';
import DriveTypes from './DriveTypes';
import Transmissions from './Transmissions';
import EngineAndDrivetrainViewModel from './ViewModel';

const EngineAndDrivetrainContainer = styled('div')(({ theme }) => ({
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

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

interface Props {
  viewModel: EngineAndDrivetrainViewModel;
}

const EngineAndDrivetrainView: React.FC<Props> = ({ viewModel }) => {
  return (
    <EngineAndDrivetrainContainer>
      <Titles variant="caption">{viewModel.transmissionFilterLabel}</Titles>
      <Transmissions />
      <Titles variant="caption">{viewModel.driveTypeFilterLabel}</Titles>
      <DriveTypes />
      <Titles variant="caption">{viewModel.cylindersFilterLabel}</Titles>
      <Cylinders />
      <Reset
        button
        onClick={viewModel.reset}
        disabled={viewModel.isResetButtonDisabled()}
      >
        <Value fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.resetButtonLabel}
        </Value>
      </Reset>
    </EngineAndDrivetrainContainer>
  );
};

export default observer(EngineAndDrivetrainView);
