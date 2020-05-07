import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const QuoteContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  border: `solid 1px ${theme.palette.grey['300']}`,
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '& > svg': {
    width: '35%',
    [theme.breakpoints.only('sm')]: {
      width: '15%',
    },
    [theme.breakpoints.only('md')]: {
      width: '25%',
    },
  },
}));

const Quote = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  lineHeight: '1.3',
  letterSpacing: '0.25px',
}));

interface Props {
  viewModel: ViewModel;
}

const QuotesView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const betweenSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  let gridSpacing: 2 | 3 | 4 = 2;
  if (betweenSmMd) {
    gridSpacing = 3;
  } else if (lgUp) {
    gridSpacing = 4;
  }

  return (
    <Container>
      <Grid container spacing={gridSpacing}>
        {viewModel.quotes.map((item) => {
          const { alt, LogoComponent, quote } = item;
          return (
            <Grid key={alt} item xs={12} md={6} lg={4} container>
              <QuoteContainer>
                <Quote>{quote}</Quote>
                <LogoComponent />
              </QuoteContainer>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default QuotesView;
