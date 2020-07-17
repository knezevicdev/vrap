import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import Search from './Search';
import ViewModel from './ViewModel';


const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const ViewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));


const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  gridArea: 't',
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ViewContainer>
      <ViewContent>
        <Title variant="h1">{viewModel.title}</Title>
        <Search />
      </ViewContent>
    </ViewContainer>
  );
};

export default HeroView;
