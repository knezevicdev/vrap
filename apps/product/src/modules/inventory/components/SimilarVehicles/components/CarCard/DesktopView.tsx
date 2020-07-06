import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import CarCardViewModel from './ViewModel';

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

const Media = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '186px',
  borderBottom: `2px solid ${theme.palette.grey[200]}`,
}));

const Photo = styled('img')(() => ({
  width: '100%',
  height: '186px',
  objectFit: 'cover',
}));

const EvoxLogo = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: theme.spacing(1),
  background: '#fff',
}));

const AvailableSoon = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: theme.spacing(0, 1),
  background: theme.palette.grey['400'],
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
      <Media>
        <Photo src={image} alt={title} />
        {viewModel.showLogo() && (
          <EvoxLogo src={viewModel.evoxLogo.src} alt={viewModel.evoxLogo.alt} />
        )}
        {viewModel.showAvailableSoon() && (
          <AvailableSoon fontWeight="fontWeightMedium" lineHeight="24px">
            {viewModel.availableSoon}
          </AvailableSoon>
        )}
      </Media>
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
