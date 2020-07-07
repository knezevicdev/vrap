import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import DriveTypes from './DriveTypes';
import Transmissions from './Transmissions';
import EngineAndDrivetrainViewModel from './ViewModel';

const EngineAndDrivetrainContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '16px',
}));

const Reset = styled(ListItem)(() => ({
  padding: '8px 0',
  height: '36px',
  flexDirection: 'column',
}));

const Titles = styled(Typography)(() => ({
  fontSize: '16px',
  padding: '8px 0',
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
