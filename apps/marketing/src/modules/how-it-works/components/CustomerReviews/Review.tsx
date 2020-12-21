import { styled } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Typography } from '@vroom-web/ui';
import React from 'react';

interface Review {
  heading: string;
  location: string;
  name: string;
  quote: string;
}

interface Props {
  review: Review;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.only('xs')]: {
    borderBottom: '1px solid #d6d7da',
    paddingBottom: theme.spacing(3),
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.28px',
  fontStyle: 'italic',
  color: theme.palette.text.primary,
  marginBottom: '10px',
  fontWeight: 500,
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  letterSpacing: '0.25px',
  fontStyle: 'italic',
  color: theme.palette.text.primary,
  marginBottom: '10px',
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  letterSpacing: '0.25px',
  color: theme.palette.text.primary,
  marginBottom: '5px',
}));

const Location = styled(Typography)(({ theme }) => ({
  lineHeight: '22px',
  letterSpacing: '0.22px',
  color: theme.palette.text.primary,
  marginBottom: '0px',
}));

const Ratings = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StarIcon = styled(Star)(({ theme }) => ({
  fontSize: '18px',
  marginRight: '10px',
  color: theme.palette.primary.main,
}));

const Review: React.FC<Props> = ({ review }) => {
  const { heading, quote, name, location } = review;
  return (
    <Container>
      <Ratings value={5} readOnly icon={<StarIcon />} />
      <Heading variant="body1">{heading}</Heading>
      <Quote variant="body1">{quote}</Quote>
      <Name variant="body1">{name}</Name>
      <Location variant="caption">{location}</Location>
    </Container>
  );
};

export default Review;
