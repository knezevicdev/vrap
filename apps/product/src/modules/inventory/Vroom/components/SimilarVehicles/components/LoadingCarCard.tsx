import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { styled } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const Container = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '100%',
  minHeight: '296px',
  maxWidth: '272px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
  marginRight: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    margin: theme.spacing(1, 0),
    maxWidth: '100%',
  },
}));

const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
}));

const LoadingCard: React.FC = () => {
  return (
    <Container>
      <Skeleton variant={'rect'} height={'186px'} animation="wave" />
      <Content>
        <Skeleton variant={'text'} animation="wave" width="80%" height="24px" />
        <Skeleton variant={'text'} animation="wave" height="24px" />
        <Skeleton variant={'text'} animation="wave" width="35%" height="24px" />
      </Content>
    </Container>
  );
};

export default LoadingCard;
