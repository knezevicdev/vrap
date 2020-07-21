import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import SortViewModel from './ViewModel';

const SortContainer = styled(Select)(({ theme }) => ({
  marginLeft: 'auto',
  fontWeight: 600,
  fontSize: '16px',
  color: '#257FA4',
  height: theme.spacing(4),
  '&:before': {
    borderBottom: 'solid 1px #444444',
  },
  '&:after': {
    borderBottom: 'solid 1px #444444',
  },
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
    <SortContainer value={activeSortValue} onChange={handleChange}>
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
