import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Redirect from './components/Redirect';
import { ReactComponent as VroomLogoSvg } from './svg/vroom.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: '18px',
  height: '48px',
  maxWidth: '280px',
  minWidth: '280px',
  whiteSpace: 'nowrap',
  background: '#EC0000',
  color: '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CC0000',
  },
  '&:active': {
    background: '#990000',
  },
  margin: '0 auto',
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    maxWidth: '100%',
  },
  '&.MuiButton-contained.Mui-disabled': {
    backgroundColor: '#f5f5f5',
    color: theme.palette.grey['A100'],
    border: `1px solid ${theme.palette.grey['A100']}`,
  },
}));

const PoweredBy = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const PoweredByLabel = styled(Typography)(() => ({
  color: '#767676',
  fontSize: '16px',
}));

const VroomLogo = styled(VroomLogoSvg)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StartPurchaseView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const handleClick = (): void => viewModel.handleClick();

  return (
    <ViewContainer>
      <CustomButton
        variant="contained"
        onClick={handleClick}
        disabled={viewModel.isAvailableSoon()}
      >
        {viewModel.getButtonText()}
      </CustomButton>
      <PoweredBy>
        <PoweredByLabel>{viewModel.poweredBy}</PoweredByLabel>
        <VroomLogo />
      </PoweredBy>
      {viewModel.showRedirect() && <Redirect />}
    </ViewContainer>
  );
};

export default observer(StartPurchaseView);
