import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const PeaceOfMindContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  width: '100%',
  padding: theme.spacing(0, 3),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.grey.A100}`,
  borderBottom: `1px solid ${theme.palette.grey.A100}`,
}));

const PeaceOfMindContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1232px',
  margin: '0 auto',
  padding: theme.spacing(5, 3),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(5, 0),
  },
}));

const Steps = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: { flexDirection: 'column' },
}));

const Step = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.only('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  [theme.breakpoints.only('xs')]: { marginBottom: theme.spacing(2) },
}));

const Image = styled('img')(({ theme }) => ({
  maxWidth: '80px',
  minWidth: '80px',
  maxHeight: '80px',
  minHeight: '80px',
  marginRight: theme.spacing(2),
  [theme.breakpoints.only('sm')]: {
    marginRight: '0',
    marginBottom: theme.spacing(2),
  },
}));

const Header = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
    textAlign: 'left'
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

const StepContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.only('sm')]: { minWidth: '16px' },
  marginBottom: theme.spacing(1),
  paddingRight: theme.spacing(1),
  fontWeight: 600,
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  [theme.breakpoints.only('xs')]: {fontSize: '14px',},
  [theme.breakpoints.only('sm')]: { minWidth: '16px' },
  lineHeight: '24px',
  paddingRight: theme.spacing(1),
}));

interface Props {
  viewModel: ViewModel;
}

const PeaceOfMind: React.FC<Props> = ({ viewModel }) => {
  return (
    <PeaceOfMindContainer>
      <PeaceOfMindContainerContent>
        <Header>{viewModel.title}</Header>
        <Steps>
          {viewModel.steps.map((step) => {
            const {
              title,
              description,
              img: { alt, src },
            } = step;
            return (
              <Step key={title}>
                <Image alt={alt} src={src} />
                <StepContent>
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                </StepContent>
              </Step>
            );
          })}
        </Steps>
      </PeaceOfMindContainerContent>
    </PeaceOfMindContainer>
  );
};

export default PeaceOfMind;
