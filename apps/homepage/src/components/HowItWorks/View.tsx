import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import Step from './Step';
import HowItWorksViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface HowItWorksViewProps {
  viewModel: HowItWorksViewModel;
}

const HowItWorksView: React.FC<HowItWorksViewProps> = ({ viewModel }) => {
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box
      bgcolor="secondary.main"
      color="secondary.contrastText"
      overflow="hidden"
    >
      <Container content>
        <Box
          flexDirection="column"
          py={{ xs: 6, md: 12 }}
          textAlign={{ xs: 'left', md: 'center' }}
        >
          <Box mb={{ xs: 2, md: 4 }}>
            <Typography fontWeight="fontWeightMedium" variant="h2">
              {viewModel.title()}
            </Typography>
          </Box>
          <Box mb={{ xs: 2, md: 4 }}>
            <Grid container spacing={mdAndUp ? 10 : 3}>
              {viewModel.steps().map((step, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <Step
                    description={step.description}
                    title={step.title}
                    IconComponent={step.IconComponent}
                    iconViewBox={step.iconViewBox}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksView;
