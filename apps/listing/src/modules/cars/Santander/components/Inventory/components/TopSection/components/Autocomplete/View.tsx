import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { Button } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as SearchIcon } from './search.svg';
import ViewModel, { Suggestion } from './ViewModel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    border: `1px solid ${theme.palette.grey.A100}`,
    padding: '1px',
  },
  paper: {
    margin: 0,
    borderRadius: 0,
  },
  listbox: {
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
    flexGrow: 1,
    display: 'flex',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    boxSizing: 'border-box',
    color: theme.palette.text.primary,
    fontWeight: 300,
    [theme.breakpoints.only('xs')]: {
      height: '48px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '40px',
    },
    padding: `${theme.spacing(1, 2, 1, 1)} !important`,
    '&::placeholder, &::-webkit-input-placeholder': {
      color: theme.palette.grey[700],
      opacity: 1,
    },
  },
  popper: {
    [theme.breakpoints.only('xs')]: {
      top: `164px !important`,
      right: `0 !important`,
      bottom: `0 !important`,
      left: `17px !important`,
      width: 'calc(100% - 34px) !important',
      transform: `none !important`,
      zIndex: theme.zIndex.appBar - 1,
    },
  },
}));

const StyledTextField = styled(TextField)(() => ({
  display: 'flex',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    flexGrow: 0,
    minWidth: 'auto',
    minHeight: '53px',
    maxHeight: '53px',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '45px',
    maxHeight: '45px',
  },
  background: '#EC0000',
  color: '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CC0000',
  },
  '&:active': {
    background: '#990000',
  },
}));

interface HeroAutocompleteProps {
  className?: string;
  viewModel: ViewModel;
}

const HeroAutocomplete: React.FC<HeroAutocompleteProps> = ({
  className,
  viewModel,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const xsOnly = useMediaQuery(theme.breakpoints.only('xs'));

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Suggestion | null | string
  ): void => {
    event.preventDefault();
    if (!value || typeof value === 'string') {
      return;
    }
    viewModel.navigateUsingAutocomplete(value);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    viewModel.setInputValue(value);
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      viewModel.navigateUsingSearch();
    }
  };

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    viewModel.navigateUsingSearch();
  };

  const suggestionsLoading = viewModel.suggestionsLoading();

  return (
    <Box className={className} display="flex" flexGrow={1}>
      <Autocomplete<Suggestion, undefined, boolean, boolean>
        classes={{
          root: classes.root,
          paper: classes.paper,
          listbox: classes.listbox,
          inputRoot: classes.inputRoot,
          input: classes.input,
          popper: classes.popper,
        }}
        disableClearable={true}
        freeSolo={true}
        getOptionLabel={(suggestion: Suggestion): string => suggestion.label}
        groupBy={(suggestion: Suggestion): string => suggestion.group}
        inputValue={viewModel.inputValue()}
        onChange={handleChange}
        options={viewModel.suggestions()}
        loading={suggestionsLoading}
        renderInput={(params: AutocompleteRenderInputParams): JSX.Element => (
          <StyledTextField
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <React.Fragment>
                  {suggestionsLoading && (
                    <CircularProgress color="inherit" size={20} />
                  )}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
              style: { fontSize: '16px' },
              startAdornment: (
                <React.Fragment>
                  <SearchIcon
                    style={{
                      width: '16px',
                      color: theme.palette.grey[900],
                    }}
                  />
                  {params.InputProps.startAdornment}
                </React.Fragment>
              ),
            }}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={
              xsOnly
                ? viewModel.mobileInputPlaceholder
                : viewModel.desktopInputPlaceholder
            }
          />
        )}
        style={{ flexGrow: 1 }}
      />
      <StyledButton onClick={handleButtonClick} variant="contained">
        {viewModel.buttonLabel}
      </StyledButton>
    </Box>
  );
};

export default observer(HeroAutocomplete);
