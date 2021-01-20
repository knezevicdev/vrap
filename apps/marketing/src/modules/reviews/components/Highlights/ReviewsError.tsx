import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import getConfig from 'next/config';
import React, { FC } from 'react';

const { publicRuntimeConfig } = getConfig();

const ReviewsError: FC = () => {
  const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 6),
    },
  }));

  const ErrorMessage = styled(Typography)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.grey.A100}`,
    paddingTop: theme.spacing(1),
    lineHeight: '38px',
    letterSpacing: '0.33px',
    fontSize: '24px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  }));

  return (
    <Container>
      <img
        src={`${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/review_oops.svg`}
        width={110}
        height={70}
      />
      <Typography variant="h2">oops!</Typography>
      <hr />
      <ErrorMessage textAlign="center">
        {`We can't seem to find additional reviews at this time.`} <br />
        {`Please check back with us later.`}
      </ErrorMessage>
    </Container>
  );
};

export default ReviewsError;
