import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Favorites from '../Favorites';
import NotifyMe from '../NotifyMe';
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
    paddingTop: theme.spacing(5),
    alignItems: 'start',
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
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const Divider = styled('div')(({ theme }) => ({
  margin: theme.spacing(0, 4),
  backgroundColor: theme.palette.grey['A100'],
  width: '1px',
  height: '88px',
}));

const DesktopButtonContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
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
          <YearMakeModel variant="body1">{summary.ymm}</YearMakeModel>
          <Typography variant="body1">
            {summary.trim} | {summary.miles}
          </Typography>
        </LeftContent>
        <RightContent>
          <Price />
          {!xsDown && (
            <>
              <Divider />
              <DesktopButtonContainer>
                {viewModel.isAvailableSoon() ? <NotifyMe /> : <StartPurchase />}
                <Favorites />
              </DesktopButtonContainer>
            </>
          )}
        </RightContent>
      </VehicleHeaderContainerContent>
    </VehicleHeaderContainer>
  );
};

export default observer(VehicleHeaderView);
