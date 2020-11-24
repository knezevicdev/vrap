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
    value: Carrier | string | null
  ): void => {
    event.preventDefault();
    if (typeof value === 'string') {
      return;
    }
    if (value === null) {
      viewModel.setInputValue('');
      viewModel.setCarrierAndFilter(undefined);
    } else {
      viewModel.setCarrierAndFilter(value);
    }
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
      freeSolo
      loading={viewModel.loading}
      onChange={handleChange}
      inputValue={viewModel.inputValue}
      value={viewModel.value || null}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label="Carrier"
          fullWidth
          onChange={(event): void => handleInputChange(event.target.value)}
        />
      )}
    />
  );
};

export default observer(AutocompleteView);
