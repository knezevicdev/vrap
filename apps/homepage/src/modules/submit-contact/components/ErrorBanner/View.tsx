import Box from '@material-ui/core/Box';
import WarningIcon from '@material-ui/icons/Warning';
import React from 'react';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const ErrorBanner: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box bgcolor="warning.main">
      <Container>
        <Box
          color="warning.contrastText"
          display="flex"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          py={{ xs: 2, sm: 1 }}
        >
          <Box mr={{ xs: 2, md: 2 }}>
            <WarningIcon />
          </Box>
          <Typography fontWeight="fontWeightMedium" variant="body1">
            {viewModel.text}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorBanner;
