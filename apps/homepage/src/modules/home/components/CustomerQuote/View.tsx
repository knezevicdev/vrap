import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import Picture from '../Picture';
import ViewModel from './ViewModel';

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row-reverse',
  },
}));

const StyledPicture = styled(Picture)(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  [theme.breakpoints.only('sm')]: {
    height: '350px',
  },
  [theme.breakpoints.only('md')]: {
    height: '300px',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
  [theme.breakpoints.up('lg')]: {
    height: '400px',
  },
}));

const QuoteContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '50%',
    padding: theme.spacing(4, '15%', 4, 4),
    justifyContent: 'center',
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
  return (
    <Container>
      <Card>
        <StyledPicture src={viewModel.image.src}>
          <img
            src={viewModel.image.src}
            alt={viewModel.image.alt}
            loading="lazy"
          />
        </StyledPicture>
        <QuoteContainer>
          <Quote>{viewModel.quote}</Quote>
          <Name>{viewModel.name}</Name>
          <Location variant="caption">{viewModel.location}</Location>
        </QuoteContainer>
      </Card>
    </Container>
  );
};

export default CustomerQuoteView;
