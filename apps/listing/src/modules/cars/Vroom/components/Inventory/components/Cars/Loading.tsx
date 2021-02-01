import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const DesktopCard = styled(Card)(() => ({
  height: '100%',
  minHeight: '296px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
}));

const DesktopContent = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
}));

const MobileCard = styled(Card)(() => ({
  display: 'flex',
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  borderBottom: 'solid 1px #bebebe',
}));

const MobileContent = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '60%',
  maxWidth: '60%',
}));

interface Props {
  mobile?: boolean;
  xl?: boolean;
}

const LoadingCard: React.FC<Props> = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));
  const xl = useMediaQuery(theme.breakpoints.up('xl'));
  return (
    <Grid item xs={12} sm={6} md={3}>
      {mobile ? (
        <MobileCard>
          <Skeleton
            variant={'rect'}
            width="40%"
            height={'127px'}
            animation="wave"
          />
          <MobileContent>
            <Skeleton
              variant={'text'}
              animation="wave"
              width="60%"
              height="24px"
            />
            <Skeleton
              variant={'text'}
              animation="wave"
              width="80%"
              height="24px"
            />
            <Skeleton
              variant={'text'}
              animation="wave"
              width="40%"
              height="24px"
            />
            <Skeleton
              variant={'text'}
              animation="wave"
              width="30%"
              height="24px"
            />
          </MobileContent>
        </MobileCard>
      ) : (
        <DesktopCard>
          <Skeleton
            variant={'rect'}
            height={xl ? '265px' : '186px'}
            animation="wave"
          />
          <DesktopContent>
            <Skeleton
              variant={'text'}
              animation="wave"
              width="80%"
              height="24px"
            />
            <Skeleton variant={'text'} animation="wave" height="24px" />
            <Skeleton
              variant={'text'}
              animation="wave"
              width="35%"
              height="24px"
            />
          </DesktopContent>
        </DesktopCard>
      )}
    </Grid>
  );
};

export default LoadingCard;
