import { Box, Card, Divider, Grid } from '@material-ui/core';
import { styled as muiStyled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';
import styled from 'styled-components';

import CarCardViewModel from './ViewModel';

const Container = muiStyled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '296px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
  [theme.breakpoints.up('xl')]: {
    minHeight: '315px',
  },
}));

const Media = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '186px',
  [theme.breakpoints.up('xl')]: {
    height: '265px',
  },
}));

const Photo = muiStyled('img')(({ theme }) => ({
  width: '100%',
  height: '186px',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: '100%',
  },
}));

const EvoxLogo = muiStyled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: theme.spacing(1),
  background: '#fff',
}));

const Banner = styled(Typography)<{
  primaryColor: string;
  fontColor: string;
}>`
  background: ${(props): string => props.primaryColor};
  color: ${(props): string => props.fontColor};
  padding: 0px 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  width: fit-content;
  position: relative;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  &:after {
    position: absolute;
    right: -6px;
    top: 0;
    height: 24px;
    width: 20px;
    background-color: ${(props): string => props.primaryColor};
    color: ${(props): string => props.primaryColor};
    transform: skewX(-23deg);
    content: close-quote;
    quotes: 'none';
  }
`;

const Content = muiStyled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
  padding: 0,
  borderTop: 0,
}));

const CarDetails = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(1, 2, 2),
  flexGrow: 1,
  justifyContent: 'flex-end',
}));

const Price = muiStyled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
}));

const Title = muiStyled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  whiteSpace: 'nowrap',
}));

const TrimAndMiles = muiStyled('div')(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
  color: '#041022',
}));

const Trim = muiStyled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '18px',
}));

const Miles = muiStyled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '18px',
}));

const StyledDivider = muiStyled(Divider)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const HiddenAnchor = muiStyled('a')(() => ({
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
  const bannerInfo = viewModel.getBanner();
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
          <Content
            border={
              bannerInfo?.hasBorder ? `solid 3px ${bannerInfo.color}` : 'none'
            }
          >
            {bannerInfo !== null && (
              <Banner
                primaryColor={bannerInfo.color}
                fontColor={bannerInfo.fontColor}
              >
                {bannerInfo.label}
              </Banner>
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
