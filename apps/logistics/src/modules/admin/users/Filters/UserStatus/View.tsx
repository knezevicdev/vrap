import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}
const StatusView: React.FC<Props> = ({ viewModel }) => {
  const [value, setValue] = useState(viewModel.storedValue);

  const handleChange = (value: string): void => {
    setValue(value);
    viewModel.setStatusFilterAndFilter(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="filter-carrier-label">Status</InputLabel>
      <Select
        labelId="filter-carrier-label"
        id="filter-carrier-select"
        fullWidth
        value={value}
        onChange={(event): void => handleChange(event.target.value as string)}
      >
        <MenuItem value={''}>--</MenuItem>
        {viewModel.options.length > 0 &&
          viewModel.options.map((i) => (
            <MenuItem key={i.key} value={i.key}>
              {i.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default observer(StatusView);
