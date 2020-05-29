import { styled } from '@material-ui/core/styles';
import React from 'react';

import HeaderNavViewModel from './ViewModel';

import Button from 'src/ui/Button';
import InternalLink from 'src/ui/InternalLink';

const Navigation = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const GetHelp = styled(InternalLink)(() => ({
  fontWeight: 500,
}));

const Divider = styled('div')(({ theme }) => ({
  backgroundColor: `${theme.palette.grey.A100}`,
  width: '2px',
  height: theme.spacing(5),
  margin: theme.spacing(0, 3),
}));

const ShopNow = styled(Button)(({ theme }) => ({
  minHeight: theme.spacing(5),
  minWidth: theme.spacing(17),
}));

interface DesktopViewProps {
  viewModel: HeaderNavViewModel;
}

const HeaderNavDesktopView: React.FC<DesktopViewProps> = ({ viewModel }) => {
  const contactUsLink = viewModel.contactUsLink();
  const handleButtonClick = (): void => {
    viewModel.handleButtonClick();
  };

  return (
    <Navigation>
      <GetHelp href={contactUsLink.href} color="secondary" variant="body1">
        {contactUsLink.label}
      </GetHelp>
      <Divider />
      <ShopNow color="primary" variant="contained" onClick={handleButtonClick}>
        {viewModel.ctaLabel}
      </ShopNow>
    </Navigation>
  );
};

export default HeaderNavDesktopView;
