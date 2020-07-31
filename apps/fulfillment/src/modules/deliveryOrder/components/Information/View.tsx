import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MuiPaper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';

import ViewModel from './ViewModel';

const Paper = styled(MuiPaper)(({ theme }) => ({
  padding: theme.spacing(4),
}));

interface Props {
  viewModel: ViewModel;
}
const DeliveryOrderView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const info = viewModel.getInfo();
  const element = (
    index: number,
    label: string,
    value: string | number
  ): JSX.Element => (
    <Fragment key={index}>
      <Grid item xs={6} md={4}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item xs={6} md={8}>
        <Typography variant="body1">{value}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Fragment>
  );
  const general: JSX.Element[][] = [[], []];
  info.general.items.forEach((item, index) => {
    if (index <= 2) {
      general[0].push(element(index, item.label, item.value));
    } else {
      general[1].push(element(index, item.label, item.value));
    }
  });

  const pickup = info.pickup.items.map((item, index) =>
    element(index, item.label, item.value)
  );
  pickup.push(element(pickup.length, info.created.label, info.created.value));

  const delivery = info.delivery.items.map((item, index) =>
    element(index, item.label, item.value)
  );
  delivery.push(
    element(delivery.length, info.modified.label, info.modified.value)
  );

  return (
    <>
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Paper square elevation={0}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1">{info.general.label}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    {general[0]}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    {general[1]}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item>
            <Paper square elevation={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        {info.delivery.label}
                      </Typography>
                    </Grid>
                    {pickup}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        {info.pickup.label}
                      </Typography>
                    </Grid>
                    {delivery}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default observer(DeliveryOrderView);
