import { styled } from '@material-ui/core';
import Slider, { CustomArrowProps } from 'react-slick';
import { Typography } from '@vroom-web/ui';
import _ from 'lodash';
import React from 'react';

import quotes from './quotes.json';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';

interface Quote {
  key: number;
  quote: string;
  name: string;
  date: string;
}

const Content = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex !important',
  minHeight: '150px',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '10px',
  [theme.breakpoints.down('sm')]: {
    minHeight: '170px',
  },
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

const QuoteSlider = styled(Slider)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& .slick-slide div': {
    outline: 'none',
  },
  '& .slick-dots': {
    bottom: '8px',
  },
  '& .slick-active button:before': {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const ArrowIcon = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => {
  const { className, onClick } = props;
  const component = className?.includes('slick-next')
    ? ArrowForwardIos
    : ArrowBackIos;
  const Icon = styled(component)(({ theme }) => ({
    fill: theme.palette.grey[600],
    margin: theme.spacing(0, 5),
    cursor: 'pointer',
  }));
  return <Icon onClick={onClick} fontSize="large" />;
};

const QuotesView: React.FC = () => {
  var settings = {
    arrows: true,
    prevArrow: <ArrowIcon />,
    nextArrow: <ArrowIcon />,
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
    <QuoteSlider {...settings}>
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
    </QuoteSlider>
  );
};

export default QuotesView;
