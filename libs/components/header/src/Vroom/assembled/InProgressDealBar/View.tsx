import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Bar from '../../components/Bar';
import { ReactComponent as CartSvg } from '../../svg/cart.svg';
import ViewModel from './ViewModel';

const StyledCollapse = styled(Collapse)(({ theme }) => ({
  top: '0px',
  position: 'sticky',
  zIndex: theme.zIndex.appBar,
}));

const StyledBar = styled(Bar)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'stretch',
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const Information = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.only('sm')]: {
    marginRight: theme.spacing(2),
  },
  // https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
  minWidth: 0,
}));

const StyledCartSvg = styled(CartSvg)(({ theme }) => ({
  flexShrink: 0,
  width: '32px',
  height: '32px',
  [theme.breakpoints.up('sm')]: {
    width: '36px',
    height: '36px',
    marginRight: theme.spacing(1),
  },
}));

const VehicleInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.only('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  // https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
  minWidth: 0,
}));

const YearMakeModel = styled(Typography)(({ theme }) => ({
  flexBasis: 0,
  flexGrow: 1,
  marginRight: theme.spacing(1),
  [theme.breakpoints.only('sm')]: {
    flexBasis: 'auto',
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.up('md')]: {
    minWidth: '100px',
  },
}));

const TrimAndPrice = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  // https://stackoverflow.com/questions/39838908/text-overflow-ellipsis-not-working-in-nested-flexbox
  minWidth: 0,
}));

const Trim = styled(Typography)(({ theme }) => ({
  flexBasis: 0,
  flexGrow: 1,
  marginRight: theme.spacing(1),
  [theme.breakpoints.only('sm')]: {
    flexBasis: 'auto',
    flexGrow: 0,
  },
}));

const Price = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(3),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  [theme.breakpoints.only('xs')]: {
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'auto',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const InProgressDealBarView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  const handleButtonClick = (): void => {
    viewModel.handleButtonClick();
  };

  const show = viewModel.show();

  return (
    <StyledCollapse in={show}>
      <StyledBar>
        {show && (
          <>
            <Information>
              <StyledCartSvg />
              {mdUp && (
                <Typography fontWeight="fontWeightMedium">
                  {viewModel.statusText}
                </Typography>
              )}
              <Divider flexItem orientation="vertical" variant="middle" />
              <VehicleInfo>
                <YearMakeModel
                  fontWeight="fontWeightMedium"
                  whiteSpace="nowrap"
                >
                  {viewModel.yearMakeModel()}
                </YearMakeModel>
                <TrimAndPrice>
                  {smUp && <Trim whiteSpace="nowrap">{viewModel.trim()}</Trim>}
                  <Price>{viewModel.price()}</Price>
                </TrimAndPrice>
              </VehicleInfo>
            </Information>
            <StyledButton
              color="secondary"
              onClick={handleButtonClick}
              variant="contained"
            >
              {viewModel.buttonText}
            </StyledButton>
          </>
        )}
      </StyledBar>
    </StyledCollapse>
  );
};

export default observer(InProgressDealBarView);
