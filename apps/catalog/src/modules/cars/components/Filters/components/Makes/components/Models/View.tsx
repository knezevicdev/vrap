import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ModelsViewModel from './ViewModel';

const StyledList = styled(List)(() => ({
  padding: '0',
}));

const Value = styled(Typography)(() => ({
    fontSize: '16px',
}));

interface Props {
  viewModel: ModelsViewModel;
}

const ModelsView: React.FC<Props> = ({ viewModel }) => {
  const allModel = viewModel.getAllModel();
  return (
    <StyledList>
      <ListItem
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
      </ListItem>
      {viewModel.models.map((model) => {
        const { display, slug } = model;
        const isSelected = viewModel.isSelected(slug);
        return (
          <ListItem
            key={display}
            button
            onClick={viewModel.handleClick(slug, isSelected)}
          >
            <Value
              fontWeight={isSelected ? 'fontWeightSemibold' : 'fontWeightLight'}
            >
              {display}
            </Value>
          </ListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(ModelsView);
