import { Box, Card, CardActionArea, Divider, Grid } from '@material-ui/core';
import { styled as muiStyled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';
import styled from 'styled-components';

import CarCardViewModel from './ViewModel';

const StyledCard = styled(Card)(() => ({
  width: '100%',
  minHeight: '127px',
  maxHeight: '127px',
  boxShadow: 'none',
  borderRadius: '0px',
  marginBottom: '1px',
}));

const Action = muiStyled(CardActionArea)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const Media = muiStyled('div')(() => ({
  position: 'relative',
  minWidth: '40%',
  maxWidth: '40%',
  height: '127px',
}));

const Photo = muiStyled('img')(() => ({
  width: '100%',
  height: '127px',
  objectFit: 'cover',
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
  top: -1px;
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
  height: '127px',
  padding: 0,
  borderRadius: '0px',
}));

const CarDetails = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 2, 2),
  flexGrow: 1,
  justifyContent: 'center',
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

interface MobileViewProps {
  viewModel: CarCardViewModel;
}

const MobileView: React.FC<MobileViewProps> = ({ viewModel }) => {
  const { image, title, trim, miles, price } = viewModel.getSummary();
  const bannerInfo = viewModel.getBanner();
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
                bannerInfo?.hasBorder ? `solid 3px ${bannerInfo.color}` : 'none'
              }
              borderTop={
                bannerInfo?.hasBorder
                  ? `solid 3px ${bannerInfo.color}`
                  : 'solid 1px #D6D7DA'
              }
              borderLeft="0px"
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
          </Action>
        </StyledCard>
      </HiddenAnchor>
    </Grid>
  );
};

export default MobileView;
