import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import { ReactComponent as PeaceOfMindIcon } from './svg/peace-of-mind.svg';
import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const HowItWorks: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  const steps = viewModel.steps.map((i, idx) => {
    const { title, description } = i;
    const viewBox = '0 0 35 35';
    return (
      <Grid key={idx} item xs={12} md={4}>
        <Box display="flex">
          <SvgIcon
            component={PeaceOfMindIcon}
            viewBox={viewBox}
            style={{ fontSize: 35 }}
          />
          <Box ml={2} textAlign="left">
            <Box mt={{ xs: 1 }} mb={{ xs: 1 }}>
              <Typography fontWeight="fontWeightMedium" variant="body1">
                {title}
              </Typography>
            </Box>
            <Typography
              fontWeight="fontWeightLight"
              lineHeight="1.5"
              variant="body1"
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  });

  return (
    <Box bgcolor="background.paper" overflow="hidden">
      <Container content>
        <Box
          flexDirection="column"
          py={{ xs: 6, md: 12 }}
          textAlign={{ xs: 'left', md: 'center' }}
        >
          <Box mb={{ xs: 2, md: 4 }}>
            <Typography fontWeight="fontWeightMedium" variant="h2">
              {viewModel.title}
            </Typography>
          </Box>
          <Box mb={{ xs: 2, md: 4 }}>
            <Grid container spacing={mdAndUp ? 10 : 3}>
              {steps}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
