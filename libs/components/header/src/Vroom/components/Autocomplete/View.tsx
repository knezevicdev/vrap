import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as SearchIcon } from '../../svg/search.svg';
import ViewModel, { Suggestion } from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const AutocompleteView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();

  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Suggestion | null | string
  ): void => {
    event.preventDefault();
    viewModel.handleAutocompleteChange(value);
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
      viewModel.handleAutocompleteEnterKeyDown();
    }
  };

  const suggestionsLoading = viewModel.suggestionsLoading();

  return (
    <Box display="flex" flexGrow={1}>
      <Autocomplete<Suggestion, undefined, boolean, boolean>
        classes={viewModel.classes}
        disableClearable={true}
        freeSolo={true}
        getOptionLabel={(suggestion: Suggestion): string => suggestion.label}
        groupBy={(suggestion: Suggestion): string => suggestion.group}
        onChange={handleChange}
        options={viewModel.suggestions()}
        loading={suggestionsLoading}
        inputValue={viewModel.inputValue()}
        renderInput={(params: AutocompleteRenderInputParams): JSX.Element => (
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
            placeholder={viewModel.inputPlaceholder}
          />
        )}
        style={{ flexGrow: 1 }}
      />
    </Box>
  );
};

export default observer(AutocompleteView);
