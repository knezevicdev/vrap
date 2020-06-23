import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const StyledButton = styled(Button)(() => ({
  minHeight: '48px',
}));

const SearchViewContainer = styled('div')(() => ({
  gridArea: 'sv',
}));

const Browse = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  fontWeight: 600,
  textDecoration: 'underline',
  marginTop: theme.spacing(2),
}));

interface Props {
  viewModel: ViewModel;
}

const SearchView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <SearchViewContainer>
      {smUp ? (
        <Autocomplete />
      ) : (
        <StyledButton
          color="secondary"
          onClick={viewModel.handleMobileButtonClick}
          variant="contained"
          fullWidth
        >
          {viewModel.mobileButtonLabel}
        </StyledButton>
      )}
      {smUp && (
        <ExternalLink href={viewModel.link.href}>
          <Browse>{viewModel.link.label}</Browse>
        </ExternalLink>
      )}
    </SearchViewContainer>
  );
};

export default observer(SearchView);
