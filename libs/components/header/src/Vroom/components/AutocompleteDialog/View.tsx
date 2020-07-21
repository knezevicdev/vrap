import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, styled, useTheme } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as SearchIcon } from '../../svg/search.svg';
import Autocomplete from '../Autocomplete';
import ViewModel from './ViewModel';

const StyledTypography = styled(Typography)(() => ({
  cursor: 'pointer',
}));

const useStyles = makeStyles((theme) => ({
  popper: {
    top: `66px !important`,
    right: `0 !important`,
    bottom: `0 !important`,
    left: `0 !important`,
    width: '100% !important',
    transform: `none !important`,
  },
  paper: {
    height: '100%',
    margin: 0,
    borderRadius: 0,
  },
  listbox: {
    height: `100% !important`,
    maxHeight: `none !important`,
    '& .MuiListSubheader-root': {
      color: theme.palette.grey[900],
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& .MuiAutocomplete-groupUl': {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightLight,
    },
    '& > li:not(:last-child) > .MuiAutocomplete-groupUl': {
      paddingBottom: theme.spacing(2),
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
      marginBottom: theme.spacing(1),
    },
  },
  inputRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    color: theme.palette.text.primary,
    fontWeight: 300,
    padding: `${theme.spacing(1, 2, 1, 1)} !important`,
    '&::placeholder, &::-webkit-input-placeholder': {
      color: theme.palette.grey[700],
      opacity: 1,
    },
  },
}));

interface Props {
  viewModel: ViewModel;
}

const AutocompleteDialogView: React.FC<Props> = ({ viewModel }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleIconClick = (): void => {
    setOpen(true);
  };
  const handleDialogClose = (): void => {
    setOpen(false);
  };
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <IconButton onClick={handleIconClick}>
        <SearchIcon
          style={{ width: '24px', color: theme.palette.secondary.main }}
        />
      </IconButton>
      <Dialog fullScreen={true} onClose={handleDialogClose} open={open}>
        <Box
          bgcolor="secondary.main"
          color="secondary.contrastText"
          display="flex"
          alignItems="center"
          p={2}
        >
          <Autocomplete
            classes={{
              popper: classes.popper,
              paper: classes.paper,
              listbox: classes.listbox,
              inputRoot: classes.inputRoot,
              input: classes.input,
            }}
            invSearchV3Url={viewModel.invSearchV3Url}
          />
          <Box ml={2}>
            <StyledTypography
              display="inline"
              fontWeight="fontWeightMedium"
              onClick={handleDialogClose}
              variant="body1"
            >
              {viewModel.cancelLabel}
            </StyledTypography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default AutocompleteDialogView;
