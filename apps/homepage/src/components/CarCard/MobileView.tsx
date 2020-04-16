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

const Media = styled(CardMedia)(() => ({
  minWidth: '33%',
  maxWidth: '33%',
  height: '127px',
}));

const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '67%',
  maxWidth: '67%',
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
      <Media image={image} title={title} />
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
