import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Models from './components/Models';
import MakesViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));

const StyledList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 0, 2, 0),
}));

interface Props {
  viewModel: MakesViewModel;
}

const MakesView: React.FC<Props> = ({ viewModel }) => {
  const handleMakeClick = (make: string) => (): void => {
    viewModel.toggleMakesVisibility(make);
  };

  const handleShowMoreClick = (): void => {
    viewModel.toggleShowMore();
  };

  return (
    <StyledList>
      {viewModel.getMakes().map((make) => {
        const { display, slug, isSelected, models } = make;
        return (
          <div key={display}>
            <StyledListItem button onClick={handleMakeClick(slug)}>
              <Typography
                fontWeight={isSelected ? 'fontWeightMedium' : 'fontWeightLight'}
              >
                {display}
              </Typography>
            </StyledListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
              <Models makeSlug={slug} models={models} />
            </Collapse>
          </div>
        );
      })}
      <StyledListItem button onClick={handleShowMoreClick}>
        <Typography
          variant="body1"
          fontWeight="fontWeightMedium"
          color="secondary.main"
        >
          {viewModel.getShowMoreLabel()}
        </Typography>
      </StyledListItem>
    </StyledList>
  );
};

export default observer(MakesView);
