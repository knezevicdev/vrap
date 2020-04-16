import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { styled } from '@material-ui/core/styles';
import React, { useState } from 'react';

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
  const [showMore, setShowMore] = useState(false);
  const [makesStates, setMakeState] = useState(viewModel.getInitialState());

  const handleClick = (make: string) => (): void => {
    setMakeState({ ...makesStates, [make]: !makesStates[make] });
  };

  const onShowClick = (): void => {
    setShowMore(!showMore);
  };

  return (
    <StyledList>
      {viewModel.getMakes(showMore).map(make => {
        const { isSelected, models } = viewModel.getMakeData(make, makesStates);

        return (
          <div key={make}>
            <StyledListItem button onClick={handleClick(make)}>
              <Typography
                fontWeight={isSelected ? 'fontWeightMedium' : 'fontWeightLight'}
              >
                {make}
              </Typography>
            </StyledListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
              <Models make={make} models={models} />
            </Collapse>
          </div>
        );
      })}
      <StyledListItem button onClick={onShowClick}>
        <Typography
          variant="body1"
          fontWeight="fontWeightMedium"
          color="secondary.main"
        >
          {viewModel.getShowMoreLabel(showMore)}
        </Typography>
      </StyledListItem>
    </StyledList>
  );
};

export default MakesView;
