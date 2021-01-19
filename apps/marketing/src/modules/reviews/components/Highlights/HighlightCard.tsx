import { styled } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Typography } from '@vroom-web/ui';
import React, { FC } from 'react';

import { Highlight } from '../../ReviewsContext';
import { getResizedImgSrc } from './ViewModel';

interface Props {
  highlight: Highlight;
}

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: `${theme.spacing(2)}px`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 4px 0px',
  maxWidth: '980px',
  padding: theme.spacing(3, 7),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  gap: `${theme.spacing(1)}px`,
}));

const Comment = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  fontWeight: 500,
  lineHeight: '29px',
  letterSpacing: '0.38px',
  fontSize: '24px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '21px',
  },
}));

const Reviewer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  textTransform: 'uppercase',
  lineHeight: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(5, 0),
  },
}));

const CompanyIcon = styled('img')(({ theme }) => ({
  minWidth: '100px',
  [theme.breakpoints.down('xs')]: {
    minWidth: '70px',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: theme.spacing(3, 2),
  },
}));

const Break = styled('br')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const HighlightCard: FC<Props> = ({ highlight }) => {
  return (
    <Container>
      <div>
        <StyledRating
          size="small"
          precision={0.5}
          value={highlight.rating}
          readOnly
        />
        <Comment>{highlight.comment}</Comment>
        <Reviewer>
          {highlight.reviewerName} — <Break />
          {highlight.date}
        </Reviewer>
      </div>
      <CompanyIcon src={getResizedImgSrc(highlight.reviewCompanyIconSrc)} />
    </Container>
  );
};

export default HighlightCard;
