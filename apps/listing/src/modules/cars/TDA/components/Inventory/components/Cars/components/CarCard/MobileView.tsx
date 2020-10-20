import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
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

const TestDrive = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  padding: theme.spacing(0, 1),
  color: '#ffffff',
  background: '#308407',
  fontSize: '14px',
}));

const Content = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '60%',
  maxWidth: '60%',
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
              {viewModel.showAvailableSoon() && (
                <AvailableSoon fontWeight="fontWeightMedium" lineHeight="24px">
                  {viewModel.availableSoon}
                </AvailableSoon>
              )}
              {viewModel.showSalePending() && (
                <SalePending fontWeight="fontWeightMedium" lineHeight="24px">
                  {viewModel.salePending}
                </SalePending>
              )}
              {viewModel.showTestDrive() && (
                <TestDrive fontWeight="fontWeightMedium" lineHeight="24px">
                  {viewModel.testDrive}
                </TestDrive>
              )}
            </Media>
            <Content>
              <Typography
                fontWeight="fontWeightMedium"
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
              <Price fontWeight="fontWeightMedium">{price}</Price>
            </Content>
          </Action>
        </StyledCard>
      </HiddenAnchor>
    </Grid>
  );
};

export default MobileView;
