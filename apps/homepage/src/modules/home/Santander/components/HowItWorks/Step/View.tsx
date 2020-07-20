import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const ViewContent = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const Step = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '33%',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.only('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const Image = styled('img')(() => ({
  flexShrink: 0,
  width: '64px',
  height: '64px',
}));

const Text = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  maxWidth: '296px',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#444444',
  fontSize: '18px',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.only('sm')]: {
    fontSize: '18px',
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  lineHeight: '24px',
  fontSize: '18px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContent>
      {viewModel.steps.map((step) => {
        const { src, alt, title, description } = step;
        return (
          <Step key={title}>
            <Image src={src} alt={alt} loading="lazy" />
            <Text>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Text>
          </Step>
        );
      })}
    </ViewContent>
  );
};

export default View;
