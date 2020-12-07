import { Checkbox, List, ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ModelsViewModel from './ViewModel';

const StyledList = styled(List)(() => ({
  padding: 0,
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

const StyledCheck = styled(Check)(() => ({
  marginLeft: 'auto',
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.grey['A100'],
  padding: 0,
  '&.MuiIconButton-root.Mui-disabled': {
    color: theme.palette.grey['A100'],
  },
}));

const CustomListItem = styled(ListItem)(() => ({
  justifyContent: 'space-between',
  paddingRight: 0,
}));

interface Props {
  viewModel: ModelsViewModel;
}

const ModelsView: React.FC<Props> = ({ viewModel }) => {
  const allModel = viewModel.getAllModel();
  return (
    <StyledList>
      <CustomListItem
        key={allModel.display}
        button
        onClick={viewModel.handleClick(allModel.slug, allModel.isSelected)}
      >
        <Value
          fontWeight={
            allModel.isSelected ? 'fontWeightSemibold' : 'fontWeightLight'
          }
        >
          {allModel.display}
        </Value>
        {allModel.isSelected ? (
          <StyledCheck fontSize="small" color="secondary" />
        ) : (
          <CustomCheckbox disabled={true} aria-hidden="true" />
        )}
      </CustomListItem>
      {viewModel.models.map((model) => {
        const { display, slug } = model;
        const isSelected = viewModel.isSelected(slug);
        return (
          <CustomListItem
            key={display}
            button
            dense
            onClick={viewModel.handleClick(slug, isSelected)}
          >
            <Value
              fontWeight={isSelected ? 'fontWeightSemibold' : 'fontWeightLight'}
            >
              {display}
            </Value>
            {isSelected ? (
              <StyledCheck fontSize="small" color="secondary" />
            ) : (
              <CustomCheckbox disabled={true} aria-hidden="true" />
            )}
          </CustomListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(ModelsView);
