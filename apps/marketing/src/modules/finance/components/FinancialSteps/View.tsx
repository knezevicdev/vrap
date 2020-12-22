import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(9, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 0),
  },
}));

const Content = styled('div')(({ theme }) => ({
  background: `linear-gradient(-85deg, ${theme.palette.background.paper} 37%, ${theme.palette.background.default} 37%)`,
  maxWidth: '1280px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 2),
    background: theme.palette.background.default,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  letterSpacing: '1px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    textAlign: 'center',
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const Image = styled('img')(({ theme }) => ({
  width: '50%',
  height: '50%',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const TextSection = styled('div')(({ theme }) => ({
  width: '50%',
  margin: theme.spacing(11),
  [theme.breakpoints.down('sm')]: {
    width: '60%',
    margin: 'auto',
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%',
    margin: 0,
  },
}));

const Steps = styled('ol')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const ListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '20px',
  lineHeight: '26px',
}));

const StepDescription = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '25px',
}));

const FinancialStepsView: React.FC<Props> = ({ viewModel }) => {
  const { title, steps, stepsImage } = viewModel;
  return (
    <Container>
      <Content>
        <TextSection>
          <Title variant="h2">{title}</Title>
          <Steps>
            {steps.map((step) => (
              <ListItem key={step.key}>
                <StepTitle variant="body1" fontWeight={600}>
                  {step.title}
                </StepTitle>
                <StepDescription variant="body1">
                  {step.description}
                </StepDescription>
              </ListItem>
            ))}
          </Steps>
        </TextSection>
        <Image src={stepsImage.src} alt={stepsImage.alt} />
      </Content>
    </Container>
  );
};

export default FinancialStepsView;
