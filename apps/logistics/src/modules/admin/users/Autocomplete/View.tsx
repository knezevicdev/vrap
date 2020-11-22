import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

import { Carrier } from 'src/networking/models/User';

interface Props {
  viewModel: ViewModel;
}

const AutocompleteView: React.FC<Props> = ({ viewModel }) => {
  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: Carrier | null
  ): void => {
    event.preventDefault();
    if (!value || typeof value === 'string') {
      return;
    }
    // pass value to viewModel which will then pass it to the users model to update the filters
    viewModel.setCarrierCodeAndFilter(value.carrier_code);
  };

  const handleInputChange = (value: string): void => {
    viewModel.setInputValue(value);
  };

  return (
    <Autocomplete
      options={viewModel.options}
      getOptionLabel={(option): string =>
        `${option.carrier_code} ${option.carrier}`
      }
      loading={viewModel.loading}
      onChange={handleChange}
      inputValue={viewModel.inputValue}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label="Carrier"
          onChange={(event): void => handleInputChange(event.target.value)}
          fullWidth
        />
      )}
    />
  );
};

export default observer(AutocompleteView);
