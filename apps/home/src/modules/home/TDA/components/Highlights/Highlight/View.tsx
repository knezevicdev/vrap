import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const ViewContent = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
}));

const Highlight = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '33%',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
}));

const Image = styled('img')(() => ({
  borderRadius: '50%',
  flexShrink: 0,
  width: '100px',
  height: '100px',
}));

const Text = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  maxWidth: '296px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: 'none',
  },
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
      {viewModel.highlights.map((highlight) => {
        const { src, alt, title, description } = highlight;
        return (
          <Highlight key={title}>
            <Image src={src} alt={alt} loading="lazy" />
            <Text>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Text>
          </Highlight>
        );
      })}
    </ViewContent>
  );
};

export default View;
