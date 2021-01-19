import { FormControl, Select, styled } from '@material-ui/core';
import { Button } from '@vroom-web/ui';
import _ from 'lodash';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { getReviews } from '../../api/reviewsApi';
import ReviewCard from './ReviewCard';
import ReviewsError from './ReviewsError';
export interface Reply {
  author: string;
  comment: string;
  date: string;
}
export interface Review {
  comment: string;
  date: string;
  rating: number;
  reply: Reply | null;
  reviewCompanyIconSrc: string;
  reviewerName: string;
}

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(2),
    margin: 0,
  },
}));

const StyledSelect = styled(FormControl)(({ theme }) => ({
  width: '20%',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
}));

const ReviewCards = styled('div')(({ theme }) => ({
  maxWidth: '980px',
  borderTop: `1px solid ${theme.palette.grey.A100}`,
  marginTop: theme.spacing(3),
}));

const NavSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const AllReviews: FC = () => {
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [min, setMin] = useState<number>(1);
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    getReviews(min, start).then((data): void => setReviews(data));
  }, [min, start]);

  const handleChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void => {
    setMin(event.target.value as number);
  };

  if (!reviews) {
    return <ReviewsError />;
  }

  return (
    <>
      {reviews.length > 0 && (
        <Container>
          <StyledSelect variant="outlined" size="small">
            <Select native value={min} onChange={handleChange}>
              {_.range(0, 5).map((num) => {
                num = num + 1;
                return (
                  <option value={num} key={num}>
                    {num} {num !== 1 ? 'stars' : 'star'} and up
                  </option>
                );
              })}
            </Select>
          </StyledSelect>
          <ReviewCards>
            {reviews.map((review, idx) => (
              <ReviewCard review={review} key={idx} />
            ))}
          </ReviewCards>
          <NavSection>
            <Button
              color="primary"
              onClick={(): void => setStart(start - 6)}
              disabled={!start}
            >
              {'<'} Back
            </Button>
            <Button
              color="primary"
              onClick={(): void => setStart(start + 6)}
              disabled={reviews.length < 6}
            >
              Next {'>'}
            </Button>
          </NavSection>
        </Container>
      )}
    </>
  );
};

export default AllReviews;
