import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { Cylinder as FiltersDataDriveType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import CylindersViewModel from './ViewModel';

interface Props {
  viewModel: CylindersViewModel;
}

const Label = withStyles((theme) => ({
  label: {
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '16px',
  },
}))(FormControlLabel);

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
    event: React.ChangeEvent<HTMLInputElement>,
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
        control={
          <CheckboxCustom
            color="primary"
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
      control={
        <CheckboxCustom
          color="primary"
          checked={viewModel.isOtherChecked()}
          onChange={handleOtherCheckboxChange}
          value={viewModel.otherCylinders.key}
        />
      }
      label={viewModel.otherCylinders.display}
    />
  );

  return <FormGroup>{[...cylinders, otherCylinders]}</FormGroup>;
};

export default observer(CylindersView);
