import { styled } from '@material-ui/core/styles';
import React from 'react';

import FooterCopyrightViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface FooterCopyrightViewProps {
  viewModel: FooterCopyrightViewModel;
}
const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
  },
}));

const FooterCopyrightView: React.FC<FooterCopyrightViewProps> = ({
  viewModel,
}) => {
  return (
    <Content>
      <Typography fontWeight="fontWeightLight" variant="overline">
        {viewModel.label()}
      </Typography>
    </Content>
  );
};

export default FooterCopyrightView;
