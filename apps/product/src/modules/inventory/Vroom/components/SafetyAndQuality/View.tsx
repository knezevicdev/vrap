import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@vroom-web/ui';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

interface Props {
  viewModel: ViewModel;
}

const SafetyAndQualityContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto', 4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const SafetyAndQualityContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const Header = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
}));

const SectionContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '2rem',
  [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
}));

const List = styled('ul')(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  fontSize: '1rem',
  lineHeight: '150%',
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  lineHeight: '26px',
  fontSize: '1rem',
}));

const SemiBold = styled('span')(() => ({
  fontWeight: 600,
}));

const RecallHeader = styled('span')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  display: 'block',
  backgroundColor: '#FFD400',
}));

const RecallSection = styled('div')(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

const ViewImperfectionsButton = styled('button')(({ theme }) => ({
  border: 'none',
  display: 'flex',
  margin: 0,
  padding: 0,
  background: 'transparent',
  lineHeight: '23px',
  color: '#e7131a',
}));

const StyledButtonText = styled('span')(({ theme }) => ({
  '&:hover': {
    borderBottom: '#e7131a solid 1px',
    lineHeight: '23px',
  },
}));

const Error = styled(ErrorIcon)(() => ({
  color: '#F5A622',
  marginRight: '10px',
}));

const SafetyAndQualityView: React.FC<Props> = ({ viewModel }) => {
  const {
    title,
    repair,
    safety,
    quality,
    getRecall,
    getImperfections,
  } = viewModel;
  const recall = getRecall();
  const imperfections = getImperfections();

  console.log(viewModel);
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  };

  return (
    <SafetyAndQualityContainer>
      <SafetyAndQualityContainerContent>
        <Header variant="h2">{title}</Header>
        <SectionContainer>
          <div>
            {imperfections.quantity > 0 && (
              <Box mb={2.5}>
                <Description>
                  {imperfections.description.map((item) =>
                    reactStringReplace(
                      item,
                      /<bold>(.*)<\/bold>/,
                      (match, i) => <strong key={i}>{match}</strong>
                    )
                  )}
                </Description>
                <ViewImperfectionsButton
                  aria-hidden="true"
                  onClick={scrollToTop}
                >
                  <Error />
                  <StyledButtonText>{imperfections.linkText}</StyledButtonText>
                </ViewImperfectionsButton>
              </Box>
            )}
            <Title fontWeight="fontWeightBold">{repair.title}</Title>
            <List>
              {repair.repairs.map((item) => (
                <li key={item}>
                  <Description>
                    {reactStringReplace(
                      item,
                      /<bold>(.*)<\/bold>/,
                      (match, i) => (
                        <strong key={i}>{match}</strong>
                      )
                    )}
                  </Description>
                </li>
              ))}
            </List>
          </div>
          <div>
            <Box mb={2.5}>
              <Title fontWeight={600}>{safety.title}</Title>
              <Description>{safety.description}</Description>
            </Box>
            <Title fontWeight={600}>{quality.title}</Title>
            <Description>{quality.description}</Description>
          </div>
          <div>
            <Title fontWeight={600}>
              <RecallHeader>{recall.title}</RecallHeader>
            </Title>
            <RecallSection>
              <Box mb={4}>
                <Description>
                  {recall.description1}
                  <ExternalLink href={recall.url1} target="_blank">
                    {reactStringReplace(
                      recall.linkText,
                      /(https?:\/\/\S+)/g,
                      (match, i) => (
                        <SemiBold key={match + i}>{match}</SemiBold>
                      )
                    )}
                  </ExternalLink>
                </Description>
              </Box>
              <Description>
                {reactStringReplace(
                  recall.description2,
                  /<boldlink>(.*)<\/boldlink>/,
                  (match, i) => (
                    <ExternalLink key={i} href={recall.url2} target="_blank">
                      <SemiBold>{match}</SemiBold>
                    </ExternalLink>
                  )
                )}
              </Description>
            </RecallSection>
          </div>
        </SectionContainer>
      </SafetyAndQualityContainerContent>
    </SafetyAndQualityContainer>
  );
};

export default SafetyAndQualityView;
