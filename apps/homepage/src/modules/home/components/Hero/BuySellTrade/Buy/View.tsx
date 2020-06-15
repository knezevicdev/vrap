import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

interface Props {
  viewModel: ViewModel;
}

const BuyContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
}));

const Browse = styled(ExternalLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  fontWeight: 600,
}));

interface Props {
  viewModel: ViewModel;
}

const BuyView: React.FC<Props> = ({ viewModel }) => {
  return (
    <BuyContainer>
      <Autocomplete />
      <Browse href={viewModel.link.href}>{viewModel.link.label}</Browse>
    </BuyContainer>
  );
};

export default observer(BuyView);
