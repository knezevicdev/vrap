import { Card, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import CarCardViewModel from './ViewModel';

const Container = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '296px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
  [theme.breakpoints.up('xl')]: {
    minHeight: '315px',
  },
}));

const Media = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '186px',
  [theme.breakpoints.up('xl')]: {
    height: '265px',
  },
}));

const Photo = styled('img')(({ theme }) => ({
  width: '100%',
  height: '186px',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: '100%',
  },
}));

const EvoxLogo = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: theme.spacing(1),
  background: '#fff',
}));

const AvailableSoon = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  width: 'fit-content',
  position: 'relative',
  background: '#C4C4C4',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '24px',
    width: '20px',
    backgroundColor: '#C4C4C4',
    transform: 'skewX(-23deg)',
    color: '#C4C4C4',
    content: 'close-quote',
    quotes: 'none',
  },
}));

const SalePending = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  width: 'fit-content',
  position: 'relative',
  background: '#ffd400',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '24px',
    width: '20px',
    backgroundColor: '#ffd400',
    transform: 'skewX(-23deg)',
    color: '#ffd400',
    content: 'close-quote',
    quotes: 'none',
  },
}));

const Content = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
  padding: 0,
}));

const CarDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(1, 2, 2),
  flexGrow: 1,
  justifyContent: 'flex-end',
}));

const TrimAndMiles = styled('div')(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  color: '#041022',
}));

const Divider = styled(Typography)(({ theme }) => ({
  margin: '0 4px',
  color: theme.palette.grey['A100'],
}));

const Price = styled(Typography)(() => ({
  marginTop: 'auto',
  fontSize: '16px',
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

const HiddenAnchor = styled('a')(() => ({
  '&:link': {
    textDecoration: 'inherit',
    color: 'inherit',
  },
  '&:visited': {
    textDecoration: 'inherit',
    color: 'inherit',
  },
}));

interface DesktopViewProps {
  viewModel: CarCardViewModel;
}

const DesktopView: React.FC<DesktopViewProps> = ({ viewModel }) => {
  const { image, title, trim, miles, price } = viewModel.getSummary();
  const handleActionClick = (): void => {
    viewModel.trackProductClick();
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Container>
        <HiddenAnchor href={viewModel.link()} onClick={handleActionClick}>
          <Media>
            <Photo src={image} alt={title} style={viewModel.getPhotoStyle()} />
            {viewModel.showLogo() && (
              <EvoxLogo
                src={viewModel.evoxLogo.src}
                alt={viewModel.evoxLogo.alt}
              />
            )}
          </Media>
          <Content>
            {viewModel.showAvailableSoon() && (
              <AvailableSoon>{viewModel.availableSoon}</AvailableSoon>
            )}
            {viewModel.showSalePending() && (
              <SalePending>{viewModel.salePending}</SalePending>
            )}
            <CarDetails>
              <Value fontWeight={600} lineHeight="24px" whiteSpace="nowrap">
                {title}
              </Value>
              <TrimAndMiles>
                <Value
                  fontWeight="fontWeightLight"
                  lineHeight="24px"
                  whiteSpace="nowrap"
                >
                  {trim}
                </Value>
                <Divider fontWeight="fontWeightLight" lineHeight="24px">
                  |
                </Divider>
                <Value fontWeight="fontWeightLight" lineHeight="24px">
                  {miles}
                </Value>
              </TrimAndMiles>
              <Price fontWeight={600}>{price}</Price>
            </CarDetails>
          </Content>
        </HiddenAnchor>
      </Container>
    </Grid>
  );
};

export default DesktopView;
