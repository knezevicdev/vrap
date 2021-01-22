import { FormControlLabel, List, ListItem } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { Cylinder as FiltersDataDriveType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import CylindersViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

interface Props {
  viewModel: CylindersViewModel;
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
      <StyledListItem key={display} button>
        <Label
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
      </StyledListItem>
    );
  });

  const otherCylinders = (
    <StyledListItem key={viewModel.otherCylinders.key} button>
      <Label
        labelPlacement="start"
        control={
          <Checkbox
            checked={viewModel.isOtherChecked()}
            onChange={handleOtherCheckboxChange}
            value={viewModel.otherCylinders.key}
          />
        }
        label={viewModel.otherCylinders.display}
      />
    </StyledListItem>
  );

  return <StyledList>{[...cylinders, otherCylinders]}</StyledList>;
};

export default observer(CylindersView);
