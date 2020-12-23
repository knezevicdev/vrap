import { styled } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  background: '#F5F5F5',
  justifyContent: 'center',
  position: 'relative',
}));

const Inner = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1080px',
  padding: '16px 32px',
  fontFamily: 'Calibre, Arial, sans-serif',
  fontSize: '18px',
  textAlign: 'center',
  [theme.breakpoints.down('xs')]: {
    fontSize: '14px',
  },
}));

const CloseIcon = styled(Close)(() => ({
  width: '16px',
  height: '16px',
  position: 'absolute',
  top: '16px',
  right: '16px',
}));

const LocationsLink = styled('span')(() => ({
  cursor: 'pointer',
  fontWeight: 'bold',
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container data-tda-banner>
      <Inner>
        {`${viewModel.bannerText} `}
        <LocationsLink onClick={viewModel.scrollToLocation}>
          {viewModel.linkText}
        </LocationsLink>
      </Inner>
      <CloseIcon onClick={viewModel.closeBanner} />
    </Container>
  );
};

export default View;