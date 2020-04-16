import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const StyledImg = styled('img')(() => ({
  width: '100%',
}));

interface Props {
  viewModel: ViewModel;
}

const CarCardView: React.FC<Props> = ({ viewModel }) => {
  if (viewModel.dataReady()) {
    return (
      <Box bgcolor="background.paper" border={1} borderColor="grey.400">
        <StyledImg alt={viewModel.imgAlt()} src={viewModel.imgSrc()} />
        <Box p={2}>
          <Box mb={1}>
            <Typography
              fontWeight="fontWeightMedium"
              variant="body1"
              whiteSpace="nowrap"
            >
              {viewModel.title()}
            </Typography>
          </Box>
          <Box display="flex" mb={2}>
            <Typography
              fontWeight="fontWeightLight"
              whiteSpace="nowrap"
              variant="body1"
            >
              {viewModel.trimAndMileageLabel()}
            </Typography>
          </Box>
          <Typography fontWeight="fontWeightMedium" variant="body1">
            {viewModel.priceLabel()}
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};

export default observer(CarCardView);
