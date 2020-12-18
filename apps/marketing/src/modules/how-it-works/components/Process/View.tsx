import { Link, styled } from '@material-ui/core';
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
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const ProcessView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Content>
        {viewModel.sections.map((section) => (
          <Section>
            <Heading variant="h2">{section.title}</Heading>
            {section.subsections.map((subsection) => (
              <Subsection>
                <Image src={subsection.imgSrc} />
                <div>
                  <Typography variant="body1">{subsection.title}</Typography>
                  {subsection.steps.map((step) => (
                    <Step>
                      <Typography variant="body1">{step.title}</Typography>
                      <Typography variant="body1">
                        {step.description}
                      </Typography>
                      <Link href={step.link?.to}>
                        <Typography variant="body1">
                          {step.link?.text}
                        </Typography>
                      </Link>
                    </Step>
                  ))}
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
