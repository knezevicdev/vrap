import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { observer } from 'mobx-react';
import React from 'react';

import TransmissionsViewModel from './ViewModel';

import { Transmission } from 'src/modules/cars/utils/url';

interface Props {
  viewModel: TransmissionsViewModel;
}

const Label = withStyles((theme) => ({
  label: {
    fontWeight: theme.typography.fontWeightLight,
  },
}))(FormControlLabel);

const Transmissions: React.FC<Props> = ({ viewModel }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const transmission = event.target.value as Transmission;
    viewModel.handleClick(transmission);
  };

  return (
    <RadioGroup value={viewModel.getActiveTransmission()} onChange={onChange}>
      {viewModel.values.map((transmission) => {
        return (
          <Label
            key={transmission}
            value={transmission}
            control={<Radio color="primary" />}
            label={transmission}
          />
        );
      })}
    </RadioGroup>
  );
};

export default observer(Transmissions);
