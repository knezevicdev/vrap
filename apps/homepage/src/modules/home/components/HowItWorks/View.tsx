import { styled } from '@material-ui/core/styles';
import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const Background = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(3),
  },
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.sm,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  letterSpacing: '0.25px',
  lineHeight: '1.3',
}));

const LearnMore = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '1.75px',
}));

const Video = styled('video')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(4),
}));

interface Props {
  viewModel: ViewModel;
}

const HowItWorksView: React.FC<Props> = ({ viewModel }) => {
  const [poster, setPoster] = React.useState('');
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const jpeg2000 = Object.values(window.Modernizr.jpeg2000);
      const webp = Object.values(window.Modernizr.webp).indexOf(false) === -1;
      if (jpeg2000) {
        setPoster(viewModel.video.poster.jpeg2000);
      }
      if (webp) {
        setPoster(viewModel.video.poster.webp);
      }
      if (!jpeg2000 && !webp) {
        setPoster(viewModel.video.poster.default);
      }
    }
  }, [
    viewModel.video.poster.jpeg2000,
    viewModel.video.poster.webp,
    viewModel.video.poster.default,
  ]);
  return (
    <Background>
      <StyledContainer>
        <Title variant="h2">{viewModel.title}</Title>
        <SubTitle>{viewModel.subtitle}</SubTitle>
        <ExternalLink href={viewModel.link.href}>
          <LearnMore variant="button">{viewModel.link.label}</LearnMore>
        </ExternalLink>
        <Video controls poster={poster} preload="none">
          <source src={viewModel.video.src} type="video/mp4" />
        </Video>
      </StyledContainer>
    </Background>
  );
};

export default HowItWorksView;
