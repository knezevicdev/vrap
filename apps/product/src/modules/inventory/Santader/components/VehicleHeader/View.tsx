import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Price from '../Price';
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
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  borderLeft: `1px solid ${theme.palette.grey.A100}`,
  borderBottom: `1px solid ${theme.palette.grey.A100}`,
  borderRight: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(5, 2),
  },
  paddingLeft: 0,
}));

const LeftContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 2,
  paddingLeft: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    paddingLeft: theme.spacing(5, 2),
  },
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

const Summary = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

const Divider = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 4),
  backgroundColor: theme.palette.grey['A100'],
  width: '1px',
  height: '80px',
}));

const DesktopOnly = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: {
    display: 'none',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const VehicleHeaderView: React.FC<Props> = (props) => {
  const { viewModel } = props;

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
          <Price />
          <DesktopOnly>
            <Divider />
          </DesktopOnly>
          <DesktopOnly>
            <StartPurchase />
          </DesktopOnly>
        </RightContent>
      </VehicleHeaderContainerContent>
    </VehicleHeaderContainer>
  );
};

export default observer(VehicleHeaderView);
