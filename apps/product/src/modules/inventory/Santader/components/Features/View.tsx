import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const FeaturesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const FeaturesContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const Features = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: theme.spacing(3),
}));

const Feature = styled(Typography)(({ theme }) => ({
  minWidth: '25%',
  maxWidth: '25%',
  fontSize: '16px',
  lineHeight: '24px',
  [theme.breakpoints.only('xs')]: {
    minWidth: '100%',
    fontSize: '14px',
  },
  [theme.breakpoints.only('sm')]: {
    minWidth: '50%',
  },
  marginBottom: theme.spacing(2),
}));

const Show = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: '#257FA4',
  cursor: 'pointer',
  fontSize: '16px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

const FeaturesView: React.FC<Props> = ({ viewModel }) => {
  return (
    <FeaturesContainer>
      <FeaturesContainerContent>
        <Title>{viewModel.title}</Title>
        <Features>
          {viewModel.getFeatures().map((feature, index) => {
            return <Feature key={`${index}: feature`}>{feature}</Feature>;
          })}
        </Features>
        {viewModel.showButton() && (
          <Show onClick={viewModel.onClick}>{viewModel.getButtonLabel()}</Show>
        )}
      </FeaturesContainerContent>
    </FeaturesContainer>
  );
};

export default observer(FeaturesView);
