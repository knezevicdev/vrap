import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import Basics from './components/Basics';
import Performance from './components/Performance';
import VehicleSize from './components/VehicleSize';
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
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' },
}));

const History = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(3, 0, 0, 0),
  [theme.breakpoints.only('xs')]: { marginLeft: 0 },
  [theme.breakpoints.only('sm')]: { marginLeft: 0 },
}));

const HistoryTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontWeight: 600,
}));

const HistoryDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  lineHeight: 'normal',
}));

const CarfaxLink = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '1.75px',
  color: theme.palette.grey['500'],
  textTransform: 'uppercase',
}));

const WarrantyHistoryContainer = styled('div')(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('sm')]: { width: '100%' },
}));

const HistoryContentContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const DetailsContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

const BodyAndPerformance = styled('div')(({ theme }) => ({
  width: '50%',
  maxWidth: '50%',
  [theme.breakpoints.down('sm')]: { width: '100%', maxWidth: '100%' },
}));

const CarDetailsView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const history = viewModel.history();

  return (
    <CarDetailsContainer>
      <CarDetailsContainerContent>
        <Typography variant="h2" fontWeight="fontWeightMedium">
          {viewModel.title}
        </Typography>

        <DetailsData>
          <History>
            <Title>{history.title}</Title>
            <HistoryTitle>
              {history.ownerTitle}
              <Typography fontWeight="fontWeightRegular" display="inline">
                {history.ownerCount}
              </Typography>
            </HistoryTitle>
            <HistoryContentContainer>
              <WarrantyHistoryContainer>
                <HistoryTitle>{history.cleanHistory}</HistoryTitle>
                <HistoryDescription>
                  {history.cleanHistoryDescription}
                </HistoryDescription>
                <ExternalLink href={history.carfax.href} target="_blank">
                  <CarfaxLink>{history.carfax.text}</CarfaxLink>
                </ExternalLink>
              </WarrantyHistoryContainer>
              <WarrantyHistoryContainer>
                {history.isWarrantyAvailable ? (
                  <div>
                    <HistoryTitle>{history.manufacturersWarranty}</HistoryTitle>
                    <HistoryDescription>
                      {history.residualText}
                    </HistoryDescription>
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
              </WarrantyHistoryContainer>
            </HistoryContentContainer>
          </History>
          <DetailsContainer>
            <BodyAndPerformance>
              <Basics />
              <Performance />
            </BodyAndPerformance>
            <VehicleSize />
          </DetailsContainer>
        </DetailsData>
      </CarDetailsContainerContent>
    </CarDetailsContainer>
  );
};

export default observer(CarDetailsView);
