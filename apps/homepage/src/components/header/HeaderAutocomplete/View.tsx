import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderInputParams } from '@material-ui/lab/Autocomplete';
import React from 'react';

import { ReactComponent as SearchIcon } from '../svg/search.svg';
import HeaderAutocompleteViewModel, { Suggestion } from './ViewModel';

interface HeaderAutocompleteProps {
  classes?: object;
  headerAutocompleteViewModel: HeaderAutocompleteViewModel;
  afterNavigateUsingAutocomplete?: () => void;
  afterNavigateUsingSearch?: () => void;
}

const HeaderAutocomplete: React.FC<HeaderAutocompleteProps> = ({
  classes,
  headerAutocompleteViewModel,
  afterNavigateUsingAutocomplete,
  afterNavigateUsingSearch,
}) => {
  const theme = useTheme();

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Suggestion | null
  ): void => {
    event.preventDefault();
    if (!value) {
      return;
    }
    headerAutocompleteViewModel.navigateUsingAutocomplete(value);
    if (afterNavigateUsingAutocomplete) {
      afterNavigateUsingAutocomplete();
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    headerAutocompleteViewModel.setInputValue(value);
  };

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      headerAutocompleteViewModel.navigateUsingSearch();
      if (afterNavigateUsingSearch) {
        afterNavigateUsingSearch();
      }
    }
  };

  const suggestionsLoading = headerAutocompleteViewModel.suggestionsLoading();

  return (
    <Box display="flex" flexGrow={1}>
      <Autocomplete<Suggestion>
        classes={classes}
        disableClearable={true}
        freeSolo={true}
        getOptionLabel={(suggestion: Suggestion): string => suggestion.label}
        groupBy={(suggestion: Suggestion): string => suggestion.group}
        onChange={handleChange}
        options={headerAutocompleteViewModel.suggestions()}
        loading={suggestionsLoading}
        inputValue={headerAutocompleteViewModel.inputValue()}
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
            placeholder={headerAutocompleteViewModel.inputPlaceholder()}
          />
        )}
        style={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default HeaderAutocomplete;
