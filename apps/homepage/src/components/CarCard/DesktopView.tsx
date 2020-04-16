import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

import CarCardViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface DesktopViewProps {
  viewModel: CarCardViewModel;
}

const Container = styled(Card)(() => ({
  height: '100%',
  minHeight: '296px',
}));

const Action = styled(CardActionArea)(() => ({
  height: '100%',
}));

const NoAction = styled(Action)(() => ({
  pointerEvents: 'none',
}));

const Media = styled(CardMedia)(() => ({
  width: '100%',
  height: '186px',
}));

const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
}));

const TrimAndMiles = styled('div')(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  color: '#041022',
}));

const Divider = styled(Typography)(() => ({
  margin: '0 4px',
}));

const Price = styled(Typography)(() => ({
  marginTop: 'auto',
}));

const LoadingCard: React.FC = () => {
  return (
    <NoAction>
      <Media>
        <Skeleton variant={'rect'} height={'100%'} />
      </Media>
      <Content />
    </NoAction>
  );
};

const RegularCard: React.FC<DesktopViewProps> = ({ viewModel }) => {
  const { image, title, trim, miles, price } = viewModel.getSummary();
  const handleActionClick = (): void => {
    viewModel.navigate();
  };

  return (
    <Action onClick={handleActionClick}>
      <Media image={image} title={title} />
      <Content>
        <Typography
          fontWeight="fontWeightMedium"
          lineHeight="24px"
          whiteSpace="nowrap"
        >
          {title}
        </Typography>
        <TrimAndMiles>
          <Typography
            fontWeight="fontWeightLight"
            lineHeight="24px"
            whiteSpace="nowrap"
          >
            {trim}
          </Typography>
          <Divider fontWeight="fontWeightLight" lineHeight="24px">
            |
          </Divider>
          <Typography fontWeight="fontWeightLight" lineHeight="24px">
            {miles}
          </Typography>
        </TrimAndMiles>
        <Price fontWeight="fontWeightMedium">{price}</Price>
      </Content>
    </Action>
  );
};

const DesktopView: React.FC<DesktopViewProps> = ({ viewModel }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Container>
        {viewModel.loading() ? (
          <LoadingCard />
        ) : (
          <RegularCard viewModel={viewModel} />
        )}
      </Container>
    </Grid>
  );
};

export default DesktopView;
