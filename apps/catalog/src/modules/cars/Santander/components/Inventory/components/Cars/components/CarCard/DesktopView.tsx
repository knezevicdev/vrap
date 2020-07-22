import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import CarCardViewModel from './ViewModel';

const Container = styled(Card)(() => ({
  height: '100%',
  minHeight: '296px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
}));

const Media = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '186px',
  borderBottom: `2px solid ${theme.palette.grey[200]}`,
}));

const Photo = styled('img')(() => ({
  width: '100%',
  height: '186px',
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
  position: 'absolute',
  top: 0,
  left: 0,
  padding: theme.spacing(0, 1),
  background: theme.palette.grey['400'],
  fontSize: '14px',
}));

const SalePending = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: theme.spacing(0, 1),
  background: '#ffd400',
  fontSize: '14px',
}));

const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '110px',
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
            {viewModel.showAvailableSoon() && (
              <AvailableSoon fontWeight={600} lineHeight="24px">
                {viewModel.availableSoon}
              </AvailableSoon>
            )}
            {viewModel.showSalePending() && (
              <SalePending fontWeight={600} lineHeight="24px">
                {viewModel.salePending}
              </SalePending>
            )}
          </Media>
          <Content>
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
          </Content>
        </HiddenAnchor>
      </Container>
    </Grid>
  );
};

export default DesktopView;
