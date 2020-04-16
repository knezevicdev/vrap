import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel, { Summary } from './ViewModel';

import Typography from 'src/ui/Typography';

interface Props {
  summary: Summary;
  viewModel: ViewModel;
}

const CarCardView: React.FC<Props> = ({ viewModel, summary }) => {
  const handleClick = (): void => {
    viewModel.handleCarCardClick(summary);
  };
  return (
    <Grid item key={summary.vin} xs={6} sm={4} md={3}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            image={summary.imgUrl}
            title={summary.ymm}
            component="img"
            width="100%"
          />
          <CardContent>
            <Box mb={2}>
              <Typography variant="body1" fontWeight="fontWeightMedium">
                {summary.ymm}
              </Typography>
              <Typography variant="body1" fontWeight="fontWeightLight">
                {summary.trim} | {summary.miles}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="fontWeightMedium">
              {summary.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default observer(CarCardView);
