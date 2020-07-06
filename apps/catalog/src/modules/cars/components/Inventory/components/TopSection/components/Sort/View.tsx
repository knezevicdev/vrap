import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import SortViewModel from './ViewModel';

const SortContainer = styled(Select)(({ theme }) => ({
  marginLeft: 'auto',
  fontWeight: theme.typography.fontWeightLight,
}));

interface Props {
  viewModel: SortViewModel;
}

const SortView: React.FC<Props> = ({ viewModel }) => {
  const activeSortValue = viewModel.getActiveSortValue();
  const sorts = viewModel.getSorts();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    const value = event.target.value as string;
    const matchingSort = sorts.find((s) => s.display === value);
    viewModel.handleChange(matchingSort);
  };

  return (
    <SortContainer value={activeSortValue} onChange={handleChange}>
      <MenuItem key={viewModel.nonSortDisplay} value={viewModel.nonSortDisplay}>
        {viewModel.nonSortDisplay}
      </MenuItem>
      {sorts.map((sort) => {
        const { display } = sort;
        return (
          <MenuItem key={display} value={display}>
            {display}
          </MenuItem>
        );
      })}
    </SortContainer>
  );
};

export default observer(SortView);
