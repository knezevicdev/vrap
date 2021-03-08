import { Box, Card, CardActionArea, Divider, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import CarCardViewModel from './ViewModel';

const StyledCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  marginBottom: '1px',
}));

const Action = styled(CardActionArea)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const Media = styled('div')(() => ({
  position: 'relative',
  minWidth: '40%',
  maxWidth: '40%',
  height: '127px',
}));

const Photo = styled('img')(() => ({
  width: '100%',
  height: '127px',
  objectFit: 'cover',
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
  top: '-1px',
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
  top: '-1px',
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

const BlueBadge = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  width: 'fit-content',
  position: 'relative',
  background: '#0F3A7B',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  color: '#ffffff',
  top: '-1px',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '24px',
    width: '20px',
    backgroundColor: '#0F3A7B',
    transform: 'skewX(-23deg)',
    color: '#0F3A7B',
    content: 'close-quote',
    quotes: 'none',
  },
}));

const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '127px',
  padding: 0,
  borderRadius: '0px',
}));

const CarDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 2, 2),
  flexGrow: 1,
  justifyContent: 'center',
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

interface MobileViewProps {
  viewModel: CarCardViewModel;
}

const MobileView: React.FC<MobileViewProps> = ({ viewModel }) => {
  const { image, title, trim, miles, price } = viewModel.getSummary();
  const handleActionClick = (): void => {
    viewModel.trackProductClick();
  };
  return (
    <Grid item xs={12}>
      <HiddenAnchor href={viewModel.link()} onClick={handleActionClick}>
        <StyledCard>
          <Action onClick={handleActionClick}>
            <Media>
              <Photo src={image} alt={title} />
              {viewModel.showLogo() && (
                <EvoxLogo
                  src={viewModel.evoxLogo.src}
                  alt={viewModel.evoxLogo.alt}
                />
              )}
            </Media>
            <Content
              border={
                viewModel.showTenDayDelivery() ||
                viewModel.showLoadedWithFeatures()
                  ? 'solid 3px #0F3A7B'
                  : 'none'
              }
              borderTop={
                viewModel.showTenDayDelivery() ||
                viewModel.showLoadedWithFeatures()
                  ? 'solid 3px #0F3A7B'
                  : 'solid 1px #D6D7DA'
              }
              borderLeft="0px"
            >
              {viewModel.showAvailableSoon() && (
                <AvailableSoon>{viewModel.availableSoon}</AvailableSoon>
              )}
              {viewModel.showSalePending() && (
                <SalePending>{viewModel.salePending}</SalePending>
              )}
              {viewModel.showTenDayDelivery() && (
                <BlueBadge>{viewModel.tenDayDelivery}</BlueBadge>
              )}
              {viewModel.showLoadedWithFeatures() && (
                <BlueBadge>{viewModel.loadedWithFeatures}</BlueBadge>
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
          </Action>
        </StyledCard>
      </HiddenAnchor>
    </Grid>
  );
};

export default MobileView;
