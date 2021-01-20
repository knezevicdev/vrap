import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { Button } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel, { Suggestion } from './ViewModel';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 0,
    borderRadius: 0,
    '& .MuiListSubheader-root': {
      ...theme.typography.caption,
      color: theme.palette.grey[500],
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    '& .MuiAutocomplete-groupUl': {
      ...theme.typography.body1,
      color: theme.palette.text.primary,
      letterSpacing: '0.25px',
      lineHeight: '1.3',
    },
  },
  inputRoot: {
    backgroundColor: theme.palette.background.paper,
    height: '40px',
  },
  input: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    letterSpacing: '0.25px',
    lineHeight: '1.3',
    padding: `${theme.spacing(1)}px !important`,
    '&::placeholder, &::-webkit-input-placeholder': {
      color: theme.palette.grey[500],
      opacity: 1,
    },
    border: 'solid 1px #E0E0E0',
  },
}));

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInput-formControl': {
    marginTop: theme.spacing(1),
  },
  '& .MuiInputLabel-root': {
    position: 'static',
    transform: 'none',
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: '14px',
    color: theme.palette.text.primary,
  },
  '& input': {
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  '& .Mui-error input': {
    borderColor: theme.palette.error.main,
  },
  '& .Mui-error.MuiInputLabel-root': {
    color: theme.palette.error.main,
  },
}));

const HeroAutoCompleteBox = styled(Box)(() => ({
  maxWidth: '680px',
  flexDirection: 'column',
}));

interface HeroAutocompleteProps {
  buttonVariant?: 'outlined' | 'contained';
  className?: string;
  viewModel: ViewModel;
}

const HeroAutocomplete: React.FC<HeroAutocompleteProps> = ({
  buttonVariant,
  className,
  viewModel,
}) => {
  const classes = useStyles();

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
    <HeroAutoCompleteBox className={className} display="flex" flexGrow={1}>
      <Autocomplete<Suggestion, undefined, boolean, boolean>
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
        renderInput={(params: AutocompleteRenderInputParams): JSX.Element => (
          <Input
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
            InputLabelProps={{ disableAnimation: true }}
            label={viewModel.label}
            focused={true}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={viewModel.inputPlaceholder}
          />
        )}
        style={{ flexGrow: 1, margin: '16px 0' }}
      />
      <Button
        onClick={handleButtonClick}
        variant={buttonVariant || 'contained'}
        color="primary"
      >
        {viewModel.buttonLabel}
      </Button>
    </HeroAutoCompleteBox>
  );
};

export default observer(HeroAutocomplete);
