import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import { DriveType as FiltersDataDriveType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import DriveTypesViewModel from './ViewModel';

interface Props {
  viewModel: DriveTypesViewModel;
}

const Label = withStyles((theme) => ({
  label: {
    fontWeight: theme.typography.fontWeightLight,
  },
}))(FormControlLabel);

const DriveTypesView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataDriveType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <FormGroup>
      {viewModel.getDriveTypes().map((driveType) => {
        const checked = viewModel.isChecked(driveType);
        const { display, filtersDataValue } = driveType;

        return (
          <Label
            key={display}
            control={
              <Checkbox
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

export default observer(DriveTypesView);
