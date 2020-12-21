import { Card, CardActionArea, Grid } from '@material-ui/core';
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
  borderBottom: 'solid 1px #bebebe',
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
  lineHeight: '25px',
  width: 'fit-content',
  position: 'relative',
  background: '#C4C4C4',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '25px',
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
  lineHeight: '25px',
  width: 'fit-content',
  position: 'relative',
  background: '#ffd400',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '25px',
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
  minWidth: '60%',
  maxWidth: '60%',
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
  marginTop: 'auto',
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
            <Content>
              {viewModel.showAvailableSoon() && (
                <AvailableSoon>{viewModel.availableSoon}</AvailableSoon>
              )}
              {viewModel.showSalePending() && (
                <SalePending>{viewModel.salePending}</SalePending>
              )}
              <CarDetails>
                <Typography
                  fontWeight={600}
                  lineHeight="24px"
                  whiteSpace="nowrap"
                >
                  {title}
                </Typography>
                <Typography
                  fontWeight="fontWeightLight"
                  lineHeight="24px"
                  whiteSpace="nowrap"
                >
                  {trim}
                </Typography>

                <Typography fontWeight="fontWeightLight" lineHeight="24px">
                  {miles}
                </Typography>
                <Price fontWeight={600}>{price}</Price>
              </CarDetails>
            </Content>
          </Action>
        </StyledCard>
      </HiddenAnchor>
    </Grid>
  );
};

export default MobileView;
