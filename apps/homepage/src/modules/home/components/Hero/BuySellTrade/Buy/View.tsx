import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';
import {Typography} from "@vroom-web/ui";

interface Props {
  viewModel: ViewModel;
}

const BuyContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
}));

const BrowseText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '20px',
  letterSpacing: '0.25px',
  marginTop: theme.spacing(2)
}));

interface Props {
  viewModel: ViewModel;
}

const BuyView: React.FC<Props> = ({ viewModel }) => {
  return (
    <BuyContainer>
      <Autocomplete />
      <ExternalLink href={viewModel.link.href}>
        <BrowseText>{viewModel.link.label}</BrowseText>
      </ExternalLink>
    </BuyContainer>
  );
};

export default observer(BuyView);
