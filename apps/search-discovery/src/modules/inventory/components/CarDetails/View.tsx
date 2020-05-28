import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import ExternalLink from 'src/ui/ExternalLink';
import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const CarDetailsView: React.FC<Props> = props => {
  const { viewModel } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const history = viewModel.history();
  const basics = viewModel.basics();
  const performance = viewModel.performance();
  const recalls = viewModel.recalls();

  return (
    <Container content>
      <Box mb={{ xs: 2, sm: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h2" fontWeight="fontWeightMedium">
              {viewModel.title}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container justify="space-around">
        <Grid item xs={12} sm={4}>
          <Box pr={{ xs: 0, sm: 6 }} pb={{ xs: 2, sm: 0 }}>
            <Grid container spacing={xsDown ? 1 : 2}>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  fontWeight="fontWeightMedium"
                  color="grey.700"
                >
                  {history.title}
                </Typography>
              </Grid>
              {history.isWarrantyAvailable && (
                <Grid item xs={12}>
                  <Box mb={1}>
                    <Typography variant="body1" fontWeight="fontWeightMedium">
                      {history.manufacturersWarranty}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightLight"
                    lineHeight="24px"
                  >
                    {history.residualText}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="body1" fontWeight="fontWeightMedium">
                    {history.cleanHistory}
                  </Typography>
                </Box>
                <Box mb={1}>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightLight"
                    lineHeight="24px"
                  >
                    {history.cleanHistoryDescription}
                  </Typography>
                </Box>
                <ExternalLink href={history.carfax.href} target="_blank">
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightMedium"
                    color="primary.main"
                  >
                    {history.carfax.text}
                  </Typography>
                </ExternalLink>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="fontWeightMedium">
                  {history.ownerCount}
                </Typography>
              </Grid>
              {!history.isWarrantyAvailable && (
                <Grid item xs={12}>
                  <Box mb={1}>
                    <Typography variant="body1" fontWeight="fontWeightMedium">
                      {history.vroomProtect}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightLight"
                    display="inline"
                    lineHeight="24px"
                  >
                    {reactStringReplace(
                      history.vroomProtectDescription.text,
                      /<link>(.*)<\/link>/,
                      (match, index) => (
                        <ExternalLink
                          key={index}
                          href={history.vroomProtectDescription.href}
                          target="_blank"
                        >
                          <Typography
                            variant="body1"
                            fontWeight="fontWeightMedium"
                            color="primary.main"
                            display="inline"
                            component="span"
                          >
                            {match}
                          </Typography>
                        </ExternalLink>
                      )
                    )}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box pr={{ xs: 0, sm: 6 }} pb={{ xs: 2, sm: 0 }}>
            <Grid container>
              <Grid item xs={12}>
                <Box pb={{ xs: 1, sm: 2 }}>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightMedium"
                    color="grey.700"
                  >
                    {basics.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {basics.items.map(text => {
                  return (
                    <Box mb={2} key={text}>
                      <Typography variant="body1" fontWeight="fontWeightLight">
                        {text}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box pb={{ xs: 2, sm: 0 }}>
            <Grid container>
              <Grid item xs={12}>
                <Box pb={{ xs: 1, sm: 2 }}>
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightMedium"
                    color="grey.700"
                  >
                    {performance.title}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                {performance.items.map(text => {
                  return (
                    <Box mb={2} key={text}>
                      <Typography variant="body1" fontWeight="fontWeightLight">
                        {text}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <ExternalLink href={recalls.href} target="_blank">
                  <Typography
                    variant="body1"
                    fontWeight="fontWeightMedium"
                    color="primary.main"
                    display="inline"
                  >
                    {recalls.text}
                  </Typography>
                </ExternalLink>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default observer(CarDetailsView);
