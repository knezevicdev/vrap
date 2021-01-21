import { styled, useMediaQuery, useTheme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Typography } from '@vroom-web/ui';
import React from 'react';
import { FC } from 'react';

import { Review } from './AllReviews';
import { getResizedImgSrc } from './ViewModel';

interface Props {
  review: Review;
}

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(2)}px`,
  padding: theme.spacing(3, 7),
  borderBottom: `1px solid ${theme.palette.grey.A100}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 0),
  },
}));

const RatingSection = styled('div')(() => ({
  flexGrow: 1,
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.primary.main,
  gap: `${theme.spacing(1)}px`,
}));

const Comment = styled(Typography)(({ theme }) => ({
  lineHeight: '1.22',
  letterSpacing: '0.28px',
  fontSize: '18px',
  marginBottom: theme.spacing(2),
}));

const ReplySection = styled('div')(({ theme }) => ({
  borderLeft: `4px solid rgb(25, 96, 208)`,
  marginTop: theme.spacing(2),
  padding: theme.spacing(2, 2, 1),
  backgroundColor: theme.palette.grey[100],
}));

const Reviewer = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  display: 'flex',
  justifyContent: 'space-between',
}));

const ReviewerText = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: '16px',
  textTransform: 'uppercase',
  lineHeight: '22px',
  letterSpacing: '0.25px',
}));

const CompanyIcon = styled('img')(({ theme }) => ({
  minWidth: '80px',
  marginRight: theme.spacing(2),
}));

const DesktopContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

const HeaderSection = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const ReviewerSection = styled('div')(() => ({
  width: '100%',
}));

const RatingAndReviewer: FC<Props> = ({ review }) => (
  <>
    <StyledRating size="small" precision={0.5} value={review.rating} readOnly />
    <Reviewer>
      <ReviewerText>{review.reviewerName}</ReviewerText>
      <ReviewerText>{review.date}</ReviewerText>
    </Reviewer>
  </>
);

const CommentAndReply: FC<Props> = ({ review }) => (
  <>
    <Comment>{review.comment}</Comment>
    {review.reply && (
      <ReplySection>
        <Comment color="#1960d0">
          {review.reply.author} replied on {review.reply.date}:
        </Comment>
        <Comment>{review.reply.comment}</Comment>
      </ReplySection>
    )}
  </>
);

const ReviewCard: FC<Props> = ({ review }) => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Container>
      {xsDown ? (
        <>
          <HeaderSection>
            <CompanyIcon src={getResizedImgSrc(review.reviewCompanyIconSrc)} />
            <ReviewerSection>
              <RatingAndReviewer review={review} />
            </ReviewerSection>
          </HeaderSection>
          <CommentAndReply review={review} />
        </>
      ) : (
        <DesktopContainer>
          <CompanyIcon src={getResizedImgSrc(review.reviewCompanyIconSrc)} />
          <RatingSection>
            <RatingAndReviewer review={review} />
            <CommentAndReply review={review} />
          </RatingSection>
        </DesktopContainer>
      )}
    </Container>
  );
};

export default ReviewCard;
