import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as CallUsIcon } from './svg/CallUs.svg';
import { ReactComponent as QuestionIcon } from './svg/Question.svg';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  '& .bold': {
    fontWeight: 600,
  },
}));

const Body = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
}));

const BodyCard = styled('div')(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.grey.A100}`,
  padding: theme.spacing(4),
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  fontWeight: 600,
}));

const BoxContent = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const BoxBody = styled(Typography)(() => ({
  lineHeight: '26px',
  display: 'block',
}));

const BoxBodyBold = styled('strong')(() => ({
  fontWeight: 600,
}));

interface Props {
  viewModel: ViewModel;
}

const NeedHelpView: React.FC<Props> = ({ viewModel }) => {
  const { title, subtitle, faq, call } = viewModel;
  return (
    <Container>
      <Content>
        <Typography variant="h2" fontWeight="fontWeightMedium">
          {title}
        </Typography>
        <Subtitle>{subtitle}</Subtitle>
        <Body>
          <BodyCard>
            <div>
              <QuestionIcon />
            </div>
            <BoxContent>
              <BoxTitle>{faq.title}</BoxTitle>
              <BoxBody>
                <ExternalLink href={faq.href} target="_blank">
                  {faq.hrefText}
                </ExternalLink>
                {faq.body}
              </BoxBody>
            </BoxContent>
          </BodyCard>
          <BodyCard>
            <div>
              <CallUsIcon />
            </div>
            <BoxContent>
              <BoxTitle>{call.title}</BoxTitle>
              <BoxBody>{call.phone}</BoxBody>
              {call.times.map((item) => (
                <BoxBody key={item.day}>
                  <BoxBodyBold>{item.day}</BoxBodyBold>
                  {item.time}
                </BoxBody>
              ))}
              <BoxBody>{call.timezone}</BoxBody>
            </BoxContent>
          </BodyCard>
        </Body>
      </Content>
    </Container>
  );
};

export default NeedHelpView;
