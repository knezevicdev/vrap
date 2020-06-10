import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import Picture from '../Picture';
import ViewModel from './ViewModel';

const Capsule = styled(Grid)(({ theme }) => ({
  height: 'auto',
  [theme.breakpoints.only('md')]: {
    height: '300px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '400px',
  },
}));

const QuoteContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  height: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, '30%', 4, 4),
    justifyContent: 'center',
  },
}));

const PictureGrid = styled(Grid)(({ theme }) => ({
  height: 'inherit',
  order: 1,
  [theme.breakpoints.up('md')]: {
    order: 2,
  },
}));
const QuoteGrid = styled(Grid)(({ theme }) => ({
  height: 'inherit',
  order: 2,
  [theme.breakpoints.up('md')]: {
    order: 1,
  },
}));

const Image = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  width: '100%',
  height: '200px',
  [theme.breakpoints.only('sm')]: {
    height: '350px',
  },
  [theme.breakpoints.only('md')]: {
    height: '300px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '400px',
  },
}));

const Quote = styled(Typography)(({ theme }) => ({
  letterSpacing: '0.25px',
  lineHeight: '1.3',
  marginBottom: theme.spacing(5),
}));

const Name = styled(Typography)(() => ({
  fontSize: '20px',
  fontWeight: 600,
  letterSpacing: '0.25px',
  lineHeight: '1.2',
  marginBottom: '2px',
}));

const Location = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
  fontWeight: 600,
  letterSpacing: '1.25px',
}));

interface Props {
  viewModel: ViewModel;
}

const CustomerQuoteView: React.FC<Props> = ({ viewModel }) => {
  const {
    image: { src, alt },
  } = viewModel;

  return (
    <Container>
      <Paper elevation={0} square>
        <Capsule container>
          <PictureGrid item xs={12} md={6}>
            <Picture src={src}>
              <Image src={src} alt={alt} />
            </Picture>
          </PictureGrid>
          <QuoteGrid item xs={12} md={6}>
            <QuoteContainer>
              <Quote>{viewModel.quote}</Quote>
              <Name>{viewModel.name}</Name>
              <Location variant="caption">{viewModel.location}</Location>
            </QuoteContainer>
          </QuoteGrid>
        </Capsule>
      </Paper>
    </Container>
  );
};

export default CustomerQuoteView;
