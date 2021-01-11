import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

import ViewModel from './ViewModel';

import { Status as UserStatus } from 'src/networking/models/User';

interface Props {
  viewModel: ViewModel;
}
const StatusView: React.FC<Props> = ({ viewModel }) => {
  const [value, setValue] = useState(viewModel.storedValue);

  const handleChange = (value: UserStatus): void => {
    setValue(value);
    viewModel.setStatusFilterAndFilter(value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Status</FormLabel>
      <RadioGroup
        name="carrier-status"
        value={value}
        onChange={(event): void =>
          handleChange(event.target.value as UserStatus)
        }
      >
        {viewModel.options.length > 0 &&
          viewModel.options.map((i) => (
            <FormControlLabel
              key={i.key}
              value={i.key}
              control={<Radio />}
              label={i.label}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default observer(StatusView);
