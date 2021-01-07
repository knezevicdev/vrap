import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
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

  return (
    <Grid container alignItems="center">
      <Grid item xs={viewModel.carrierName ? 10 : 12}>
        {edit || !viewModel.carrierName ? (
          <Autocomplete
            options={viewModel.options}
            getOptionLabel={(option): string =>
              `${option.carrier_code} ${option.carrier}`
            }
            freeSolo
            disableClearable
            loading={viewModel.loading}
            onChange={handleChange}
            inputValue={viewModel.inputValue}
            value={viewModel.value || ''}
            renderInput={(params): JSX.Element => (
              <TextField
                {...params}
                fullWidth
                label="Carrier"
                variant="outlined"
                onChange={(event): void =>
                  handleInputChange(event.target.value)
                }
              />
            )}
          />
        ) : (
          <>{viewModel.carrierName}</>
        )}
      </Grid>
      {viewModel.carrierName && (
        <Grid item xs={2}>
          <IconButton onClick={(): void => handleClick()}>
            {edit ? <CancelIcon /> : <EditIcon />}
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default observer(AutocompleteView);
