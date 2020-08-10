import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

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
  fontSize: '16px',
  padding: theme.spacing(1, 0),
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
      <Titles fontWeight="fontWeightMedium">
        {viewModel.transmissionFilterLabel}
      </Titles>
      <Transmissions />
      <Titles fontWeight="fontWeightMedium">
        {viewModel.driveTypeFilterLabel}
      </Titles>
      <DriveTypes />
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
