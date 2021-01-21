import { FormControlLabel, FormGroup } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { FuelType as FiltersDataFuelType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import FuelTypesViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

interface Props {
  viewModel: FuelTypesViewModel;
}

const Label = withStyles((theme) => ({
  label: {
    fontSize: '16px',
  },
  root: {
    justifyContent: 'space-between',
    marginLeft: '0px',
    '& span.Mui-checked + span': {
      fontWeight: 600,
    },
    padding: theme.spacing(0, 2),
  },
}))(FormControlLabel);

const FormGroupCustom = withStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
  },
}))(FormGroup);

const FuelTypesView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataFuelType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <FormGroupCustom>
      {viewModel.getFuelTypes().map((driveType) => {
        const checked = viewModel.isChecked(driveType);
        const { display, filtersDataValue } = driveType;

        return (
          <Label
            key={display}
            labelPlacement="start"
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                value={filtersDataValue}
              />
            }
            label={display}
          />
        );
      })}
    </FormGroupCustom>
  );
};

export default observer(FuelTypesView);
