import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React from 'react';

import CarCardView from './CarCardView';
import ErrorView from './ErrorView';
import ViewModel from './ViewModel';

import InternalLink from 'src/ui/InternalLink';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const SimilarVehiclesView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));
  const smOnly = useMediaQuery(theme.breakpoints.only('sm'));

  if (viewModel.error()) {
    return <ErrorView viewModel={viewModel} />;
  }

  let numCardsToShow = 4;
  if (xsOnly) {
    numCardsToShow = 2;
  } else if (smOnly) {
    numCardsToShow = 3;
  }

  const summaries = viewModel.getSummaries();
  const summariesToShow = summaries.slice(0, numCardsToShow);
  const cards = summariesToShow.map(summary => (
    <CarCardView key={summary.vin} viewModel={viewModel} summary={summary} />
  ));

  return (
    <>
      <Box mb={4}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h2"
              fontWeight="fontWeightMedium"
              display="inline"
            >
              {viewModel.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box textAlign="right">
              <InternalLink href={viewModel.link.href}>
                <Typography
                  variant="body1"
                  fontWeight="fontWeightMedium"
                  display="inline"
                  color="secondary.main"
                >
                  {viewModel.link.label}
                </Typography>
              </InternalLink>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} justify="space-evenly">
        {cards}
      </Grid>
    </>
  );
};

export default observer(SimilarVehiclesView);
