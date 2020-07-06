import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { Transmission as FiltersDataTransmission } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import TransmissionsViewModel from './ViewModel';

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
    const filtersDataValue = event.target.value as FiltersDataTransmission;
    viewModel.handleRadioGroupChange(filtersDataValue);
  };

  return (
    <RadioGroup value={viewModel.getActiveTransmission()} onChange={onChange}>
      <Label
        control={<Radio color="primary" />}
        label={viewModel.allOption.display}
        value={viewModel.allOption.value}
      />
      {viewModel.getTransmissions().map((transmission) => {
        const { display, filtersDataValue } = transmission;
        return (
          <Label
            key={display}
            value={filtersDataValue}
            control={<Radio color="primary" />}
            label={display}
          />
        );
      })}
    </RadioGroup>
  );
};

export default observer(Transmissions);
