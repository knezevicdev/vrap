import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import { ModelsViewProps } from './types';

import Typography from 'src/ui/Typography';

const StyledList = styled(List)(() => ({
  padding: '0',
}));

const ModelsView: React.FC<ModelsViewProps> = ({ models, viewModel }) => {
  return (
    <StyledList>
      {models.map(model => {
        const { display, isSelected } = viewModel.getModelInfo(model);
        return (
          <ListItem
            key={model}
            button
            onClick={viewModel.onClick(model, isSelected)}
          >
            <Typography
              fontWeight={isSelected ? 'fontWeightMedium' : 'fontWeightLight'}
            >
              {display}
            </Typography>
          </ListItem>
        );
      })}
    </StyledList>
  );
};

export default ModelsView;
