import { styled } from '@material-ui/core/styles';
import { Button } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

const BrowseAllMobile = styled(Button)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.only('xs')]: {
    display: 'flex',
    fontSize: '14px',
    height: '48px',
    width: '100%',
    background: '#EC0000',
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
      background: '#CC0000',
    },
  },
}));

const AutocompleteDesktop = styled(Autocomplete)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    display: 'none',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const SearchView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <AutocompleteDesktop />
      <BrowseAllMobile
        onClick={viewModel.handleMobileButtonClick}
        variant="contained"
      >
        {viewModel.mobileButtonLabel}
      </BrowseAllMobile>
    </>
  );
};

export default observer(SearchView);
