import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Map from '../Map/Map';
import ViewModel from './ViewModel';

const ViewContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto'),
  width: '100%',
  marginBottom: '64px',
}));

const ViewContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '860px',
  margin: '0 auto',
}));

const Title = styled(Typography)(({ theme }) => ({
  color: 'black',
  lineHeight: '48x',
  fontSize: '48px',
  letterSpacing: '1px',
  fontWeight: 700,
  fontFamily: 'RingsideCompressed',
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.down('xs')]: {
    fontSize: '32px',
    lineHeight: '32px',
  },
}));

const MapContainer = styled('div')(({ theme }) => ({
  height: '340px',
  flex: '0 0 540px',
  [theme.breakpoints.down('sm')]: {
    height: '280pxx',
    flex: '0 0 430px',
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: '32px 0',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignContent: 'center',
  },
}));

const TextColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '20px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '0',
    paddingTop: '16px',
  },
}));

const ColumnItem = styled('div')(() => ({
  marginBottom: '16px',
}));

const Address = styled('div')(() => ({
  textDecoration: 'underline',
}));

const Subtitle = styled('div')(() => ({
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: '0.25px',
  marginBottom: '8px',
}));

const Description = styled('div')(() => ({
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0.25px',
  marginBottom: '8px',
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Title>{viewModel.title}</Title>

        <ContentContainer>
          <MapContainer>
            <Map coords={viewModel.locationInfo.coords} />
          </MapContainer>
          <TextColumn>
            <ColumnItem>
              <Address>{viewModel.address}</Address>
            </ColumnItem>
            <ColumnItem>
              <Subtitle>{viewModel.contactInfo.label}</Subtitle>
              <Description>{viewModel.contactInfo.line1}</Description>
              <Description>{viewModel.contactInfo.line2}</Description>
            </ColumnItem>
            <ColumnItem>
              <Subtitle>{viewModel.officeHours.label}</Subtitle>
              <Description>{viewModel.officeHours.line1}</Description>
              <Description>{viewModel.officeHours.line2}</Description>
            </ColumnItem>
          </TextColumn>
        </ContentContainer>

        {viewModel.paragraphs &&
          viewModel.paragraphs.map((paragraph: string, i: number) => (
            <Description key={i}>{paragraph}</Description>
          ))}
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
