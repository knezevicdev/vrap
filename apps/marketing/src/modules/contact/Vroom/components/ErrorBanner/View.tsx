import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ErrorBanner: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box
      bgcolor="warning.main"
      p={1}
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Box
        color="warning.contrastText"
        display="flex"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Box mr={{ xs: 2, md: 2 }}>
          <WarningIcon />
        </Box>
        <Typography fontWeight="fontWeightMedium" variant="body1">
          {viewModel.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorBanner;
