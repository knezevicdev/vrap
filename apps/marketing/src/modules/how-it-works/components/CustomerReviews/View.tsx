import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import { sampleSize } from 'lodash';
import React, { useEffect, useState } from 'react';

import Review from './Review';
import reviews from './reviews.json';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

interface CustomerReview {
  name: string;
  location: string;
  heading: string;
  quote: string;
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
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  letterSpacing: '1px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: {
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
  const [reviewsToDisplay, setReviewsToDisplay] = useState<CustomerReview[]>(
    []
  );
  const { title } = viewModel;

  useEffect(() => {
    const sample = sampleSize(reviews, 4);
    setReviewsToDisplay(sample);
  }, []);

  return (
    <Container>
      <Content>
        <Title variant="h2">{title}</Title>
        <ReviewsSection>
          {reviewsToDisplay.map((review, idx) => (
            <Review review={review} key={idx} />
          ))}
        </ReviewsSection>
      </Content>
    </Container>
  );
};

export default CustomerReviewsView;