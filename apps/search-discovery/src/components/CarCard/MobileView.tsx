import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

import CarCardViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface MobileViewProps {
  viewModel: CarCardViewModel;
}

const StyledGrid = styled(Grid)(() => ({
  display: 'flex',
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  borderBottom: 'solid 1px #bebebe',
}));

const Action = styled(CardActionArea)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const NoAction = styled(Action)(() => ({
  pointerEvents: 'none',
}));

const Media = styled('div')(() => ({
  position: 'relative',
  minWidth: '40%',
  maxWidth: '40%',
  height: '127px',
}));

const Photo = styled('img')(() => ({
  width: '100%',
  height: '127px',
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
  minWidth: '60%',
  maxWidth: '60%',
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

const RegularCard: React.FC<MobileViewProps> = ({ viewModel }) => {
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
          <AvailableSoon
            fontWeight="fontWeightMedium"
            variant="overline"
            lineHeight="24px"
          >
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
        <Typography
          fontWeight="fontWeightLight"
          lineHeight="24px"
          whiteSpace="nowrap"
        >
          {trim}
        </Typography>

        <Typography fontWeight="fontWeightLight" lineHeight="24px">
          {miles}
        </Typography>
        <Price fontWeight="fontWeightMedium">{price}</Price>
      </Content>
    </Action>
  );
};

const MobileView: React.FC<MobileViewProps> = ({ viewModel }) => {
  return (
    <StyledGrid item xs={12}>
      <StyledCard>
        {viewModel.loading() ? (
          <LoadingCard />
        ) : (
          <RegularCard viewModel={viewModel} />
        )}
      </StyledCard>
    </StyledGrid>
  );
};

export default MobileView;
