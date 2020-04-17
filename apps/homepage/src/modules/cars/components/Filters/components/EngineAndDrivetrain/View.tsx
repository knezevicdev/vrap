import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import DriveTypes from './DriveTypes';
import Transmissions from './Transmissions';
import EngineAndDrivetrainViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

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
  padding: '8px 0',
}));

interface Props {
  viewModel: EngineAndDrivetrainViewModel;
}

const EngineAndDrivetrainView: React.FC<Props> = ({ viewModel }) => {
  return (
    <EngineAndDrivetrainContainer>
      <Titles fontWeight="fontWeightMedium">Transmission</Titles>
      <Transmissions />
      <Titles fontWeight="fontWeightMedium">Drive Type</Titles>
      <DriveTypes />
      <Reset button onClick={viewModel.reset} disabled={viewModel.isDisabled()}>
        <Typography fontWeight="fontWeightMedium" color="secondary.main">
          {viewModel.resetButtonLabel}
        </Typography>
      </Reset>
    </EngineAndDrivetrainContainer>
  );
};

export default EngineAndDrivetrainView;