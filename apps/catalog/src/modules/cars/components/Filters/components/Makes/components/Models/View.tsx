import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import ModelsViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const StyledList = styled(List)(() => ({
  padding: '0',
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
        <Typography
          fontWeight={
            allModel.isSelected ? 'fontWeightSemibold' : 'fontWeightLight'
          }
        >
          {allModel.display}
        </Typography>
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
            <Typography
              fontWeight={isSelected ? 'fontWeightSemibold' : 'fontWeightLight'}
            >
              {display}
            </Typography>
          </ListItem>
        );
      })}
    </StyledList>
  );
};

export default observer(ModelsView);
