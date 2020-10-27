import React from 'react';
import ViewModel from './ViewModel';
import {
  styled,
  useTheme,
  useMediaQuery,
  Link,
  Divider,
} from '@material-ui/core';
import { Typography } from '@vroom-web/ui';

interface Props {
  viewModel: ViewModel;
}

const SuperCenterContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const SuperCenterContent = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey['A100']}`,
  width: '100%',
  maxWidth: '1280px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(10, 6),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '680px',
    padding: theme.spacing(4, 3),
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const LocationImage = styled('div')(({ theme }) => ({
  height: '123px',
  width: '100%',
  marginBottom: '20px',
  [theme.breakpoints.up('md')]: {
    height: '420px',
    width: '1000px',
    marginRight: '119px',
    marginBottom: 0,
    alignSelf: 'flex-start',
  },
  [theme.breakpoints.only('sm')]: {
    marginBottom: '30px',
    height: '230px',
  },
}));

const Image = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
}));

const Heading = styled(Typography)(() => ({
  lineHeight: '32px',
  marginBottom: '20px',
}));

const SubHeading = styled(Typography)(() => ({
  lineHeight: '26px',
  marginBottom: '20px',
}));

const LocationInfo = styled('div')(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.only('sm')]: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Section = styled('div')(() => ({
  marginBottom: '10px',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.primary.main,
  lineHeight: '30px',
  fontWeight: 600,
  letterSpacing: '0.23px',
}));

const Info = styled(Typography)(() => ({
  fontSize: '18px',
  lineHeight: '25px',
  letterSpacing: '0.23px',
}));

const SuperCenterInfo: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title, subtitle, supercenter, locationDetails } = viewModel;

  const LocationInfoSection: JSX.Element = (
    <LocationInfo>
      <Section>
        <Title>{locationDetails.name}</Title>
        <Info>{locationDetails.addressLine1}</Info>
        <Info>{locationDetails.addressLine2}</Info>
        <Link href={locationDetails.map.link} target="_blank">
          <Info>{locationDetails.map.text}</Info>
        </Link>
      </Section>
      <Section>
        <Title>{locationDetails.phone.title}</Title>
        <Info>{locationDetails.phone.office}</Info>
        <Info>{locationDetails.phone.fax}</Info>
      </Section>
      <Section>
        <Title>{locationDetails.hoursOfOperation.title}</Title>
        <Info>{locationDetails.hoursOfOperation.days}</Info>
        <Info>{locationDetails.hoursOfOperation.time}</Info>
      </Section>
    </LocationInfo>
  );

  return (
    <SuperCenterContainer>
      <SuperCenterContent>
        {isMobile ? (
          <>
            <div>
              <Heading variant="h2">{title}</Heading>
              <SubHeading>{subtitle}</SubHeading>
            </div>
            <LocationImage>
              <Image src={supercenter.src} alt={supercenter.alt}></Image>
            </LocationImage>
            {LocationInfoSection}
          </>
        ) : (
          <>
            <LocationImage>
              <Image src={supercenter.src} alt={supercenter.alt}></Image>
            </LocationImage>
            <div>
              <Heading variant="h2">{title}</Heading>
              <SubHeading>{subtitle}</SubHeading>
              {LocationInfoSection}
            </div>
          </>
        )}
        <Divider />
      </SuperCenterContent>
    </SuperCenterContainer>
  );
};

export default SuperCenterInfo;
