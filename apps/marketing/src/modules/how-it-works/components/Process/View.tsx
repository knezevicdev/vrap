import { Link, styled } from '@material-ui/core';
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
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(5, 2, 2),
  },
}));

const Section = styled('div')(() => ({}));

const Image = styled('img')(({ theme }) => ({
  height: '158px',
  minWidth: '236px',
  [theme.breakpoints.only('xs')]: {
    display: 'none',
  },
}));

const Subsection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  gap: '35px',
  [theme.breakpoints.down('md')]: {
    gap: '20px',
  },
}));

const Step = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Heading = styled(Typography)(({ theme }) => ({
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

const SubsectionTitle = styled(Typography)(() => ({
  letterSpacing: '0.86px',
  lineHeight: '32px',
  fontSize: '24px',
}));

const StepsSection = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(3),
  paddingLeft: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    borderLeft: '1px solid rgb(214, 215, 218)',
  },
  [theme.breakpoints.only('xs')]: {
    marginLeft: theme.spacing(1),
    paddingLeft: 0,
  },
}));

const StepTitle = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  fontSize: '20px',
  lineHeight: '25px',
}));

const StepTitleSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: theme.spacing(2),
}));

const StepDescriptionSection = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(4),
}));

const StepDescription = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  fontSize: '18px',
  lineHeight: '26px',
}));

const StepLink = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  letterSpacing: '1.75px',
  fontSize: '16px',
  lineHeight: '26px',
  textTransform: 'uppercase',
}));

const SubsectionIcon = styled('img')(({ theme }) => ({
  width: '46px',
  height: '44px',
  marginRight: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    marginRight: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    width: '32px',
    height: '32px',
    marginRight: 0,
  },
}));

const SubsectionTitleSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: theme.spacing(2),
}));

const ProcessView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Content>
        {viewModel.sections.map((section) => (
          <Section key={section.key}>
            <Heading variant="h2">{section.title}</Heading>
            {section.subsections.map((subsection) => (
              <Subsection key={subsection.key}>
                <Image src={subsection.imgSrc} />
                <div>
                  <SubsectionTitleSection>
                    <SubsectionIcon src={subsection.icon} />
                    <SubsectionTitle variant="body1" fontWeight={600}>
                      {subsection.title}
                    </SubsectionTitle>
                  </SubsectionTitleSection>
                  <StepsSection>
                    {subsection.steps.map((step) => (
                      <Step key={step.key}>
                        <StepTitleSection>
                          <CheckCircle color="primary" />
                          <StepTitle variant="body1" fontWeight={600}>
                            {step.title}
                          </StepTitle>
                        </StepTitleSection>
                        <StepDescriptionSection>
                          <StepDescription variant="body1">
                            {step.description}
                          </StepDescription>
                          <Link href={step.link?.to}>
                            <StepLink variant="body1" fontWeight={600}>
                              {step.link?.text}
                            </StepLink>
                          </Link>
                        </StepDescriptionSection>
                      </Step>
                    ))}
                  </StepsSection>
                </div>
              </Subsection>
            ))}
          </Section>
        ))}
      </Content>
    </Container>
  );
};

export default ProcessView;
