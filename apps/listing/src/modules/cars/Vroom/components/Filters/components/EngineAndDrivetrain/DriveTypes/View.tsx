import { FormControlLabel, List, ListItem } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { DriveType as FiltersDataDriveType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import DriveTypesViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

interface Props {
  viewModel: DriveTypesViewModel;
}

const Label = withStyles(() => ({
  label: {
    fontSize: '16px',
  },
  root: {
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: '0px',
    '& span.Mui-checked + span': {
      fontWeight: 600,
    },
  },
}))(FormControlLabel);

const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 0, 2, 0),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: theme.spacing(4),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const DriveTypesView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataDriveType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <StyledList>
      {viewModel.getDriveTypes().map((driveType) => {
        const checked = viewModel.isChecked(driveType);
        const { display, filtersDataValue } = driveType;

        return (
          <StyledListItem key={display} button>
            <Label
              labelPlacement="start"
              key={display}
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  value={filtersDataValue}
                />
              }
              label={display}
            />
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(DriveTypesView);
