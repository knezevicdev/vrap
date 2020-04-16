import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel, { Suggestion } from './ViewModel';

import Button from 'src/ui/Button';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 0,
    borderRadius: 0,
    '& .MuiListSubheader-root': {
      color: theme.palette.grey[700],
    },
    '& .MuiAutocomplete-groupUl': {
      color: theme.palette.text.primary,
    },
  },
  inputRoot: {
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    color: theme.palette.text.primary,
    fontWeight: 300,
    padding: `${theme.spacing(2, 6, 2, 2)} !important`,
    '&::placeholder, &::-webkit-input-placeholder': {
      color: theme.palette.grey[700],
      opacity: 1,
    },
  },
}));

interface HeroAutocompleteProps {
  viewModel: ViewModel;
}

const HeroAutocomplete: React.FC<HeroAutocompleteProps> = ({ viewModel }) => {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Suggestion | null
  ): void => {
    event.preventDefault();
    if (!value) {
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
    <Box display="flex" flexGrow={1}>
      <Autocomplete<Suggestion>
        classes={{
          paper: classes.paper,
          inputRoot: classes.inputRoot,
          input: classes.input,
        }}
        disableClearable={true}
        freeSolo={true}
        getOptionLabel={(suggestion: Suggestion): string => suggestion.label}
        groupBy={(suggestion: Suggestion): string => suggestion.group}
        inputValue={viewModel.inputValue()}
        onChange={handleChange}
        options={viewModel.suggestions()}
        loading={suggestionsLoading}
        renderInput={(params: RenderInputParams): JSX.Element => (
          <TextField
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
            }}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={viewModel.inputPlaceholder}
          />
        )}
        style={{ flexGrow: 1 }}
      />
      <Button color="primary" onClick={handleButtonClick} variant="contained">
        {viewModel.buttonLabel}
      </Button>
    </Box>
  );
};

export default observer(HeroAutocomplete);
