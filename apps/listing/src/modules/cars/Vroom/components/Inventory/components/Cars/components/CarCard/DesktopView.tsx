import { Card, Divider, Grid } from '@material-ui/core';
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
  borderBottom: `2px solid ${theme.palette.grey[200]}`,
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

const Price = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
}));

const Title = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  whiteSpace: 'nowrap',
}));

const TrimAndMiles = styled('div')(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  color: '#041022',
}));

const Trim = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '18px',
}));

const Miles = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '18px',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(0, 1),
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
            {viewModel.showSalePending() && (
              <SalePending>{viewModel.salePending}</SalePending>
            )}
            {viewModel.showAvailableSoon() && (
              <AvailableSoon>{viewModel.availableSoon}</AvailableSoon>
            )}
            <CarDetails>
              <Title>{title}</Title>
              <TrimAndMiles>
                <Trim>{trim}</Trim>
                <StyledDivider orientation="vertical" variant="middle" />
                <Miles>{miles}</Miles>
              </TrimAndMiles>
              <Price>{price}</Price>
            </CarDetails>
          </Content>
        </HiddenAnchor>
      </Container>
    </Grid>
  );
};

export default DesktopView;
