import { Divider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2, 6),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
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
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const Content = styled('div')(({ theme }) => ({
  maxWidth: '1280px',
  display: 'flex',
  flexDirection: 'column',
  gap: `${theme.spacing(2)}px`,
  alignItems: 'center',
}));

const Sections = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: `${theme.spacing(3)}px`,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
  },
}));

const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('xs')]: {
    alignItems: 'flex-start',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '20px',
  lineHeight: '25px',
  letterSpacing: '0.25px',
}));

const SubHeading = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.25px',
}));

const Icon = styled('img')(({ theme }) => ({
  width: '44px',
  height: '44px',
  marginRight: theme.spacing(3),
  [theme.breakpoints.down('xs')]: {
    marginRight: theme.spacing(2),
  },
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  width: '220px',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
}));

const Line = styled(Divider)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.grey.A100,
}));

interface Props {
  viewModel: ViewModel;
}

const StyledHowItWorksView: React.FC<Props> = ({ viewModel }) => {
  const { title, button, sections } = viewModel;
  return (
    <Container>
      <Content>
        <Title variant="h2">{title}</Title>
        <Line />
        <Sections>
          {sections.map((section, idx) => (
            <Section key={idx}>
              <Icon src={section.icon} />
              <div>
                <Heading fontWeight={600}>{section.heading}</Heading>
                <SubHeading>{section.description}</SubHeading>
              </div>
            </Section>
          ))}
        </Sections>
        <LearnMoreButton variant="contained" color="primary" href={button.link}>
          {button.label}
        </LearnMoreButton>
      </Content>
    </Container>
  );
};

export default StyledHowItWorksView;
