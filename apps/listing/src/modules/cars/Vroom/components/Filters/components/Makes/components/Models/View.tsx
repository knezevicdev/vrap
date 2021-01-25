import { List, ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ModelsViewModel from './ViewModel';

import Checkbox from 'src/ui/Checkbox';

const StyledList = styled(List)(({ theme }) => ({
  paddingTop: theme.spacing(0),
  paddingLeft: theme.spacing(2),
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
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
        <Checkbox aria-hidden="true" checked={allModel.isSelected} />
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
            <Checkbox checked={isSelected} aria-hidden="true" />
          </CustomListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(ModelsView);
