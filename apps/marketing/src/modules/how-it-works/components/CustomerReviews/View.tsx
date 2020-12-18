import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Review from './Review';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Content = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.only('md')]: {
    padding: theme.spacing(9, 9, 6),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5, 2, 2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5, 16, 5),
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  letterSpacing: '1px',
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const ReviewsSection = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.only('xs')]: {
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
}));

const CustomerReviewsView: React.FC<Props> = ({ viewModel }) => {
  const { title, reviews } = viewModel;

  return (
    <Container>
      <Content>
        <Title variant="h2">{title}</Title>
        <ReviewsSection>
          {reviews().map((review, idx) => (
            <Review review={review} key={idx} />
          ))}
        </ReviewsSection>
      </Content>
    </Container>
  );
};

export default CustomerReviewsView;
