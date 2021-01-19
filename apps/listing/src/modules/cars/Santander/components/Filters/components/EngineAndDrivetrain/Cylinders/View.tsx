import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Cylinder as FiltersDataDriveType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import CylindersViewModel from './ViewModel';

interface Props {
  viewModel: CylindersViewModel;
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

const FormGroupCustom = withStyles(() => ({
  root: {
    paddingBottom: '16px',
  },
}))(FormGroup);

const CheckboxCustom = withStyles((theme) => ({
  root: {
    color: theme.palette.grey['A100'],
  },
}))(Checkbox);

const CylindersView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataDriveType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };
  const handleOtherCheckboxChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    viewModel.handleOtherCheckboxChange(checked);
  };

  const cylinders = viewModel.getCylinders().map((cylinder) => {
    const checked = viewModel.isChecked(cylinder);
    const { display, filtersDataValue } = cylinder;

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
  });

  const otherCylinders = (
    <Label
      key={viewModel.otherCylinders.key}
      labelPlacement="start"
      control={
        <CheckboxCustom
          checked={viewModel.isOtherChecked()}
          onChange={handleOtherCheckboxChange}
          value={viewModel.otherCylinders.key}
        />
      }
      label={viewModel.otherCylinders.display}
    />
  );

  return <FormGroupCustom>{[...cylinders, otherCylinders]}</FormGroupCustom>;
};

export default observer(CylindersView);
