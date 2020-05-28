import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import SortViewModel from './ViewModel';

import { SortValue } from 'src/modules/cars/utils/types';

const SortContainer = styled(Select)(({ theme }) => ({
  marginLeft: 'auto',
  fontWeight: theme.typography.fontWeightLight,
}));

interface Props {
  viewModel: SortViewModel;
}

const SortView: React.FC<Props> = ({ viewModel }) => {
  const value = viewModel.getActiveState();
  const values = viewModel.getValues();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    viewModel.updateURL(event.target.value as SortValue);
  };

  return (
    <SortContainer value={value} onChange={handleChange}>
      {values.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </SortContainer>
  );
};

export default observer(SortView);
