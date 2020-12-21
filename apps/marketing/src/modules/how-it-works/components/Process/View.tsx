import { Link, styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';
import { CheckCircle } from '@material-ui/icons';

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
}));

const Section = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(11),
}));

const Image = styled('img')(({ theme }) => ({
  height: '158px',
  minWidth: '236px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Subsection = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  gap: '20px',
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
  [theme.breakpoints.down('sm')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const SubsectionTitle = styled(Typography)(() => ({
  letterSpacing: '0.86px',
  lineHeight: '32px',
  fontSize: '24px',
}));

const StepSection = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(3),
  paddingLeft: theme.spacing(5),
  borderLeft: '1px solid rgb(214, 215, 218)',
}));

const StepTitle = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  fontSize: '20px',
  lineHeight: '25px',
}));

const StepTitleSection = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: theme.spacing(2),
}));

const StepDescriptionSection = styled(Typography)(({ theme }) => ({
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
  marginRight: theme.spacing(2),
}));

const SubsectionTitleSection = styled(Typography)(({ theme }) => ({
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
                  <StepSection>
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
                  </StepSection>
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
