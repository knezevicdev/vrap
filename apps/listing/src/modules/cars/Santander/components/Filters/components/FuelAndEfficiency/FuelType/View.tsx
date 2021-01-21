import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { FuelType as FiltersDataFuelType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import FuelTypesViewModel from './ViewModel';

interface Props {
  viewModel: FuelTypesViewModel;
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

const CheckboxCustom = withStyles((theme) => ({
  root: {
    color: theme.palette.grey['A100'],
  },
}))(Checkbox);

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
              <CheckboxCustom
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
