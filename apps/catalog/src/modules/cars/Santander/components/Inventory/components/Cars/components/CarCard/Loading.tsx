import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const DesktopCard = styled(Card)(() => ({
  height: '100%',
  minHeight: '296px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
}));

const MobileCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  borderBottom: 'solid 1px #bebebe',
}));

interface Props {
  mobile?: boolean;
}

const LoadingCard: React.FC<Props> = ({ mobile }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      {mobile ? (
        <MobileCard>
          <Skeleton variant={'rect'} height={'127px'} />
        </MobileCard>
      ) : (
        <DesktopCard>
          <Skeleton variant={'rect'} height={'100%'} />
        </DesktopCard>
      )}
    </Grid>
  );
};

export default LoadingCard;
