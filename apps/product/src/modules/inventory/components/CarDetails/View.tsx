import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

interface Props {
  viewModel: ViewModel;
}

const CarDetailsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
}));

const CarDetailsContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
}));

const DetailsData = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(3),
}));

const Basics = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: theme.spacing(2),
}));

const Performance = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const History = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(3),
}));

const DetailsRow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  borderBottom: `1px solid rgba(214, 215, 218, 0.6)`,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(1),
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '20px',
  minWidth: '140px',
  color: theme.palette.grey['700'],
}));

const Value = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  whiteSpace: 'nowrap',
  letterSpacing: '0.75px',
  marginBottom: theme.spacing(2),
}));

const HistoryContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const HistoryTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
}));

const HistoryDescription = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const CarfaxLink = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  marginBottom: theme.spacing(1),
}));

const RecallLink = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  marginTop: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '1.75px',
  color: theme.palette.grey['500'],
  textTransform: 'uppercase',
}));

const CarDetailsView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  const history = viewModel.history();
  const basics = viewModel.basics();
  const performance = viewModel.performance();
  const recalls = viewModel.recalls();

  return (
    <CarDetailsContainer>
      <CarDetailsContainerContent>
        <Typography variant="h2" fontWeight="fontWeightMedium">
          {viewModel.title}
        </Typography>

        <DetailsData>
          <Basics>
            <Title>{basics.title}</Title>
            {basics.items.map((item) => {
              return (
                <DetailsRow key={item.value}>
                  <Label>{item.label}</Label>
                  <Value>{item.value}</Value>
                </DetailsRow>
              );
            })}
          </Basics>
          <Performance>
            <Title>{performance.title}</Title>

            {performance.items.map((item) => {
              return (
                <DetailsRow key={item.value}>
                  <Label>{item.label}</Label>
                  <Value>{item.value}</Value>
                </DetailsRow>
              );
            })}

            <ExternalLink href={recalls.href} target="_blank">
              <RecallLink>{recalls.text}</RecallLink>
            </ExternalLink>
          </Performance>
          <History>
            <Title>{history.title}</Title>
            {history.isWarrantyAvailable && (
              <HistoryContent>
                <HistoryTitle>{history.manufacturersWarranty}</HistoryTitle>
                <HistoryDescription>{history.residualText}</HistoryDescription>
              </HistoryContent>
            )}

            <HistoryContent>
              <HistoryTitle>{history.cleanHistory}</HistoryTitle>
              <HistoryDescription>
                {history.cleanHistoryDescription}
              </HistoryDescription>
              <ExternalLink href={history.carfax.href} target="_blank">
                <CarfaxLink>{history.carfax.text}</CarfaxLink>
              </ExternalLink>
            </HistoryContent>

            <HistoryContent>
              <HistoryTitle>{history.ownerCount}</HistoryTitle>
            </HistoryContent>
            {!history.isWarrantyAvailable && (
              <HistoryContent>
                <HistoryTitle>{history.vroomProtect}</HistoryTitle>
                <HistoryDescription>
                  {reactStringReplace(
                    history.vroomProtectDescription.text,
                    /<link>(.*)<\/link>/,
                    (match, index) => (
                      <ExternalLink
                        key={index}
                        href={history.vroomProtectDescription.href}
                        target="_blank"
                      >
                        {match}
                      </ExternalLink>
                    )
                  )}
                </HistoryDescription>
              </HistoryContent>
            )}
          </History>
        </DetailsData>
      </CarDetailsContainerContent>
    </CarDetailsContainer>
  );
};

export default observer(CarDetailsView);
