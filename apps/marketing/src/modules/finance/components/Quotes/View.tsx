import { styled } from '@material-ui/core';
import Slider from 'react-slick';
import { Typography } from '@vroom-web/ui';
import _ from 'lodash';
import React from 'react';

import quotes from './quotes.json';

interface Quote {
  key: number;
  quote: string;
  name: string;
  date: string;
}

const Content = styled('div')(() => ({
  display: 'flex !important',
  minHeight: '150px',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '10px',
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  lineHeight: '30px',
  fontStyle: 'italic',
  maxWidth: '833px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '25px',
  },
}));

const QuotesView: React.FC = () => {
  var settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 630,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {quotes.map((quote) => (
        <Content key={quote.key}>
          <Quote variant="body1">{quote.quote}</Quote>
          <div>
            <Typography variant="caption" fontWeight={600}>
              {quote.name}
            </Typography>{' '}
            <Typography variant="caption">{quote.date}</Typography>
          </div>
        </Content>
      ))}
    </Slider>
  );
};

export default QuotesView;
