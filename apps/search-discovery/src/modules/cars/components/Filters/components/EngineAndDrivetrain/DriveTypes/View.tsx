import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import withStyles from '@material-ui/core/styles/withStyles';
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
  return (
    <FormGroup>
      {viewModel.values.map((driveType) => {
        const isSelected = viewModel.getActiveDriveTypes().includes(driveType);

        return (
          <Label
            key={driveType}
            control={
              <Checkbox
                color="primary"
                checked={isSelected}
                onChange={viewModel.handleClick(driveType, isSelected)}
              />
            }
            label={driveType}
          />
        );
      })}
    </FormGroup>
  );
};

export default observer(DriveTypesView);
