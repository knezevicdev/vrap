import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import StartPurchase from '../StartPurchase';
import StatusBanner from '../StatusBanner';
import ViewModel from './ViewModel';

const VehicleHeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(0),
  },
}));

const VehicleHeaderContainerContent = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  borderLeft: `1px solid ${theme.palette.grey.A100}`,
  borderBottom: `1px solid ${theme.palette.grey.A100}`,
  borderRight: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 3),
}));

const LeftContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const RightContent = styled('div')(() => ({
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
}));

const YearMakeModel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

const Price = styled(Typography)(({theme}) => ({
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

const Summary = styled(Typography)(({theme}) => ({
  fontSize: '18px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

const Divider = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 4),
  backgroundColor: theme.palette.grey['A100'],
  width: '1px',
  height: '48px',
}));

interface Props {
  viewModel: ViewModel;
}

const VehicleHeaderView: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { viewModel } = props;

  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const summary = viewModel.summary();

  return (
    <VehicleHeaderContainer>
      <VehicleHeaderContainerContent>
        <StatusBanner />
        <LeftContent>
          <YearMakeModel>{summary.ymm}</YearMakeModel>
          <Summary>
            {summary.trim} | {summary.miles}
          </Summary>
        </LeftContent>
        <RightContent>
          <Price>{summary.price}</Price>
          {!xsDown && <Divider />}
          {!xsDown && <StartPurchase />}
        </RightContent>
      </VehicleHeaderContainerContent>
    </VehicleHeaderContainer>
  );
};

export default observer(VehicleHeaderView);
