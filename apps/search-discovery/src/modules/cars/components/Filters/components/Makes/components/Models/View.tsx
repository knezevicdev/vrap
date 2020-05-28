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
  models: string[];
  viewModel: ModelsViewModel;
}

const ModelsView: React.FC<Props> = ({ models, viewModel }) => {
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

export default observer(ModelsView);
