import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import SortViewModel from './ViewModel';

const SortContainer = styled(Select)(({ theme }) => ({
  marginLeft: 'auto',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: '16px',
  height: theme.spacing(4),
}));

const Value = styled(MenuItem)(() => ({
  fontSize: '16px',
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
    <SortContainer
      value={activeSortValue}
      onChange={handleChange}
      color="primary"
    >
      <Value key={viewModel.nonSortDisplay} value={viewModel.nonSortDisplay}>
        {viewModel.nonSortDisplay}
      </Value>
      {sorts.map((sort) => {
        const { display } = sort;
        return (
          <Value key={display} value={display}>
            {display}
          </Value>
        );
      })}
    </SortContainer>
  );
};

export default observer(SortView);
