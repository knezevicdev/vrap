import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { TestDrive as FiltersDataTestDrive } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import TestDriveViewModel from './ViewModel';

interface Props {
  viewModel: TestDriveViewModel;
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

const TestDriveView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataTestDrive;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <FormGroup>
      {viewModel.getTestDrives().map((testDrive) => {
        const checked = viewModel.isChecked(testDrive);
        const { display, filtersDataValue } = testDrive;

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
      })}
    </FormGroup>
  );
};

export default observer(TestDriveView);
