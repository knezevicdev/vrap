import { styled } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Content = styled('div')(({ theme }) => ({
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '35px',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(12, 2),
  [theme.breakpoints.down('sm')]: {
    gap: '20px',
    padding: theme.spacing(6, 2),
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  letterSpacing: '0.25px',
  fontSize: '24px',
  lineHeight: '24px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

const TitleSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  marginBottom: theme.spacing(1),
}));

const DescriptionSection = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

const Description = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  fontSize: '18px',
  lineHeight: '25px',
}));

const ValuesView: React.FC<Props> = ({ viewModel }) => {
  const { values } = viewModel;
  return (
    <Container>
      <Content>
        {values.map((value) => (
          <div key={value.key}>
            <TitleSection>
              <CheckCircle color="primary" />
              <Title variant="body1" fontWeight={600}>
                {value.title}
              </Title>
            </TitleSection>
            <DescriptionSection>
              <Description variant="body1">{value.description}</Description>
            </DescriptionSection>
          </div>
        ))}
      </Content>
    </Container>
  );
};

export default ValuesView;
