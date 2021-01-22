import { FormControlLabel, List, ListItem } from '@material-ui/core';
import { styled, withStyles } from '@material-ui/core/styles';
import { CabType as FiltersDataCabType } from '@vroom-web/catalog-url-integration';
import { observer } from 'mobx-react';
import React from 'react';

import CabTypeViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

interface Props {
  viewModel: CabTypeViewModel;
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

const CabTypeView: React.FC<Props> = ({ viewModel }) => {
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ): void => {
    const filtersDataValue = event.target.value as FiltersDataCabType;
    viewModel.handleCheckboxChange(filtersDataValue, checked);
  };

  return (
    <StyledList>
      {viewModel.getCabTypes().map((cabType) => {
        const checked = viewModel.isChecked(cabType);
        const { display, filtersDataValue } = cabType;
        return (
          <StyledListItem key={display} button>
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
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(CabTypeView);
