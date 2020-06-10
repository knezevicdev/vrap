import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const DesktopCard = styled(Card)(() => ({
  height: '100%',
  minHeight: '296px',
}));

const MobileCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  borderBottom: 'solid 1px #bebebe',
}));

const NoAction = styled(CardActionArea)(() => ({
  height: '100%',
  pointerEvents: 'none',
}));

const Media = styled('div')(() => ({
  position: 'relative',
  minWidth: '40%',
  maxWidth: '40%',
  height: '127px',
}));
const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '60%',
  maxWidth: '60%',
}));

interface Props {
  mobile?: boolean;
}

const LoadingCard: React.FC<Props> = ({ mobile }) => {
  const core = (
    <NoAction>
      <Media>
        <Skeleton variant={'rect'} height={'100%'} />
      </Media>
      <Content />
    </NoAction>
  );

  return (
    <Grid item xs={12} sm={6} md={3}>
      {mobile ? (
        <MobileCard>{core}</MobileCard>
      ) : (
        <DesktopCard>{core}</DesktopCard>
      )}
    </Grid>
  );
};

export default LoadingCard;
