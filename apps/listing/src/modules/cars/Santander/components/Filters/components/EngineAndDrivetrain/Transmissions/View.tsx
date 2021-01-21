import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import { Transmission as FiltersDataTransmission } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import TransmissionsViewModel from './ViewModel';

interface Props {
  viewModel: TransmissionsViewModel;
}

const Label = withStyles(() => ({
  label: {
    fontSize: '16px',
  },
  root: {
    justifyContent: 'space-between',
    marginLeft: '0px',
    '& span.Mui-checked + span': {
      fontWeight: 600,
    },
  },
}))(FormControlLabel);

const RadioCustom = withStyles((theme) => ({
  root: {
    color: theme.palette.grey['A100'],
  },
}))(Radio);

const RadioGroupCustom = withStyles(() => ({
  root: {
    paddingBottom: '16px',
  },
}))(RadioGroup);

const Transmissions: React.FC<Props> = ({ viewModel }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const filtersDataValue = event.target.value as FiltersDataTransmission;
    viewModel.handleRadioGroupChange(filtersDataValue);
  };

  return (
    <RadioGroupCustom
      value={viewModel.getActiveTransmission()}
      onChange={onChange}
    >
      <Label
        labelPlacement="start"
        control={<RadioCustom />}
        label={viewModel.allOption.display}
        value={viewModel.allOption.value}
      />
      {viewModel.getTransmissions().map((transmission) => {
        const { display, filtersDataValue } = transmission;
        return (
          <Label
            labelPlacement="start"
            key={display}
            value={filtersDataValue}
            control={<RadioCustom />}
            label={display}
          />
        );
      })}
    </RadioGroupCustom>
  );
};

export default observer(Transmissions);
