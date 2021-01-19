import { styled, Theme } from '@material-ui/core/styles';
import { StarBorderOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4),
  height: '500px',
  background: `linear-gradient(100deg, ${theme.palette.background.paper} 71.9%, ${theme.palette.primary.main} 72%)`,
  [theme.breakpoints.down('sm')]: {
    height: '400px',
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(2, 0),
    height: '100%',
    background: `linear-gradient(170deg, ${theme.palette.background.paper} 71.9%, ${theme.palette.primary.main} 72%)`,
  },
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  maxWidth: '1280px',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Info = styled('div')(({ theme }) => ({
  width: '40%',
  alignSelf: 'center',
  [theme.breakpoints.only('xs')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const AverageAndCar = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '60%',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AverageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '396px',
  height: '202px',
  position: 'absolute',
  flexDirection: 'column',
  textAlign: 'center',
  marginTop: theme.spacing(10),
  background: theme.palette.background.paper,

  [theme.breakpoints.up('md')]: {
    width: '357px',
    height: '182px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '250px',
    height: '132px',
    marginTop: theme.spacing(5),
  },

  [theme.breakpoints.only('xs')]: {
    width: '300px',
    height: '171px',
    marginTop: theme.spacing(2),
    position: 'relative',
  },
}));

const Heading = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.background.paper,
  textTransform: 'uppercase',
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '0.13px',
  fontWeight: 600,
}));

const AverageContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: `solid 1px ${theme.palette.grey.A100}`,
  justifyContent: 'center',
  height: '100%',
}));

const AverageRating = styled(Rating)(({ theme }) => ({
  color: theme.palette.primary.main,
  gap: `${theme.spacing(1)}px`,
  '& svg': {
    fontSize: '40px',
  },
}));

const Car = styled('div')((props: { theme: Theme; src: string }) => ({
  backgroundImage: `url(${props.src})`,
  width: '494px',
  height: '308px',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  marginLeft: 'auto',
  marginTop: 'auto',
  zIndex: 1,

  [props.theme.breakpoints.down('md')]: {
    marginBottom: props.theme.spacing(2),
    width: '440px',
    height: '270px',
  },

  [props.theme.breakpoints.down('sm')]: {
    width: '324px',
    height: '202px',
  },

  [props.theme.breakpoints.only('xs')]: {
    width: '275px',
    height: '171px',
    marginTop: props.theme.spacing(-7),
    marginBottom: props.theme.spacing(4),
  },
}));

const ReviewCount = styled(Typography)(() => ({
  fontSize: '20px',
  lineHeight: '20px',
  letterSpacing: '2px',
}));

const TagLine = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'uppercase',
  fontSize: '18px',
  lineHeight: '16px',
  letterSpacing: '1px',
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.only('sm')]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(1),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-line',
  fontSize: '62px',
  lineHeight: '66px',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only('md')]: {
    fontSize: '42px',
    lineHeight: '42px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
    lineHeight: '36px',
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  whiteSpace: 'pre-line',
  fontSize: '24px',
  lineHeight: '30px',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '20px',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const HeroView: React.FC<Props> = ({ viewModel }) => {
  const { tagline, title, subtitle, ratingBoxTitle } = viewModel;
  const summary = viewModel.getSummary();
  return (
    <Container>
      <Content>
        <Info>
          <TagLine>{tagline}</TagLine>
          <Title variant="h1">{title}</Title>
          <SubTitle>{subtitle} </SubTitle>
        </Info>
        <AverageAndCar>
          {summary && (
            <AverageContainer>
              <Heading>{ratingBoxTitle}</Heading>
              <AverageContent>
                <Typography variant="h1">{summary.averageRating}</Typography>
                <AverageRating
                  emptyIcon={<StarBorderOutlined fontSize="inherit" />}
                  size="large"
                  defaultValue={summary.averageRating}
                  precision={0.5}
                  readOnly
                />
                <ReviewCount fontWeight={600}>
                  {summary.totalNumReviews} reviews
                </ReviewCount>
              </AverageContent>
            </AverageContainer>
          )}
          <Car src={viewModel.car.src} />
        </AverageAndCar>
      </Content>
    </Container>
  );
};

export default HeroView;
