import { styled } from '@material-ui/core';
import { Button } from '@vroom-web/ui';
import React, { FC, MouseEvent, useState } from 'react';

import { Highlight } from '../../ReviewsContext';
import AllReviews from './AllReviews';
import HighlightCard from './HighlightCard';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(6, 0),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(4, 0),
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0, 2),
  },
}));

const ButtonSection = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'stretch',
    margin: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '220px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const HighlightsView: FC<Props> = ({ viewModel }) => {
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const highlights = viewModel.getHighlights();
  const { seeAll, seeLess } = viewModel;

  const handleClick = (event: MouseEvent): void => {
    event.preventDefault();
    setShowAllReviews(!showAllReviews);
  };

  return (
    <Container>
      {highlights && (
        <Content>
          {highlights.map((highlight: Highlight, idx: number) => (
            <HighlightCard highlight={highlight} key={idx} />
          ))}
        </Content>
      )}
      {showAllReviews && <AllReviews />}
      <ButtonSection>
        <StyledButton variant="contained" color="primary" onClick={handleClick}>
          {showAllReviews ? seeLess : seeAll}
        </StyledButton>
      </ButtonSection>
    </Container>
  );
};

export default HighlightsView;
