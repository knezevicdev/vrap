import { Collapse, List, ListItem } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Models from './components/Models';
import MakesViewModel from './ViewModel';

const StyledList = styled(List)(() => ({
  padding: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 2),
}));

const Value = styled(Typography)(() => ({
  fontSize: '16px',
}));

const ShowMore = styled(Typography)(() => ({
  fontSize: '16px',
  margin: 'auto',
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
              <Value
                fontWeight={isSelected ? 'fontWeightMedium' : 'fontWeightLight'}
              >
                {display}
              </Value>
            </StyledListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
              <Models makeSlug={slug} models={models} />
            </Collapse>
          </div>
        );
      })}
      <StyledListItem button onClick={handleShowMoreClick}>
        <ShowMore fontWeight="fontWeightMedium" color="primary.main">
          {viewModel.getShowMoreLabel()}
        </ShowMore>
      </StyledListItem>
    </StyledList>
  );
};

export default observer(MakesView);
