import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React from 'react';

import StartPurchase from '../StartPurchase';
import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

//#region Styling
const Paper = styled(MuiPaper)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.grey[400]}`,
  borderBottom: `1px solid ${theme.palette.grey[400]}`,
}));
//#endregion

interface Props {
  viewModel: ViewModel;
}

const VehicleHeaderView: React.FC<Props> = props => {
  const theme = useTheme();
  const { viewModel } = props;

  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const summary = viewModel.summary();

  return (
    <Paper elevation={0} square>
      <Container content>
        <Box py={{ xs: 2, md: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} spacing={1} container>
              <Grid item xs={12}>
                <Typography
                  variant={xsDown ? 'h3' : 'h2'}
                  fontWeight="fontWeightMedium"
                  textAlign={xsDown ? 'center' : 'inherit'}
                >
                  {summary.ymm}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={xsDown ? 'h3' : 'h2'}
                  fontWeight="fontWeightLight"
                  textAlign={xsDown ? 'center' : 'inherit'}
                >
                  {summary.trim} | {summary.miles}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              md={4}
              container
              alignItems="center"
              justify={xsDown ? 'center' : 'flex-end'}
            >
              <Typography
                variant={xsDown ? 'h3' : 'h2'}
                fontWeight="fontWeightMedium"
              >
                {summary.price}
              </Typography>
            </Grid>
            {!xsDown && <StartPurchase />}
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
};

export default observer(VehicleHeaderView);
