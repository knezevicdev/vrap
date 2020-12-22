import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import quotes from './quotes.json';

interface Quote {
  key: number;
  quote: string;
  name: string;
  date: string;
}

const Container = styled('div')(({ theme }) => ({
  minHeight: '150px',
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing(3, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const Content = styled('div')(() => ({
  textAlign: 'center',
}));

const Quote = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '30px',
  fontStyle: 'italic',
  maxWidth: '833px',
  width: '100%',
  marginBottom: theme.spacing(1),
}));

const QuotesView: React.FC = () => {
  const [quote, setQuote] = useState<Quote | undefined>(_.sample(quotes));

  useEffect(() => {
    const timer = setInterval(() => {
      const quote = _.sample(quotes);
      setQuote(quote);
    }, 3000);
    return (): void => clearInterval(timer);
  }, []);

  return (
    <Container>
      <Content>
        <Quote variant="body1">{quote?.quote}</Quote>
        <div>
          <Typography variant="caption" fontWeight={600}>
            {quote?.name}
          </Typography>{' '}
          <Typography variant="caption">{quote?.date}</Typography>
        </div>
      </Content>
    </Container>
  );
};

export default QuotesView;
