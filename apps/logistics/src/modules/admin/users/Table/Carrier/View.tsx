import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import ViewModel from './ViewModel';

import { Carrier } from 'src/networking/models/User';

interface Props {
  viewModel: ViewModel;
}

const AutocompleteView: React.FC<Props> = ({ viewModel }) => {
  const [edit, setEdit] = useState(false);
  const handleClick = (): void => {
    setEdit(!edit);
  };

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
      viewModel.setValue(undefined);
    } else {
      viewModel.setValue(value);
    }
    setEdit(false);
  };

  const handleInputChange = (value: string): void => {
    viewModel.setInputValue(value);
  };

  if (edit || !viewModel.carrierName) {
    return (
      <>
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
              onChange={(event): void => handleInputChange(event.target.value)}
              fullWidth
            />
          )}
        />
        <IconButton onClick={(): void => handleClick()}>
          <EditIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        {viewModel.carrierName}

        <IconButton onClick={(): void => handleClick()}>
          <EditIcon />
        </IconButton>
      </>
    );
  }
};

export default observer(AutocompleteView);
