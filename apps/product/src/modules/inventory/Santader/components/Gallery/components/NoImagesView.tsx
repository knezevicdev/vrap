import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from '../ViewModel';

const StyledImg = styled('img')(({ theme }) => ({
  maxWidth: '350px',
  opacity: '30%',
  margin: theme.spacing(4),
  width: `calc(100% - ${theme.spacing(4)}px)`,
}));

const GalleryNoImagesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(0, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3),
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(0),
  },
}));

const GalleryNoImagesContainerContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  border: `1px solid ${theme.palette.grey.A100}`,
  backgroundColor: theme.palette.background.paper,
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1, 1, 1),
  fontWeight: 600,
  fontSize: '24px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
  },
  fontFamily: 'SantanderHeadline, Arial, sans-serif',
}));

const Description = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1, 2, 1),
  fontSize: '16px',
  [theme.breakpoints.only('xs')]: {
    fontSize: '14px',
  },
  textAlign: 'center',
  lineHeight: 'normal',
}));

interface Props {
  viewModel: ViewModel;
}

const GalleryNoImagesView: React.FC<Props> = ({ viewModel }) => {
  return (
    <GalleryNoImagesContainer>
      <GalleryNoImagesContainerContent>
        <StyledImg
          alt={viewModel.defaultImage.alt}
          src={viewModel.defaultImage.src}
        />
        <Title>{viewModel.photosComing}</Title>
        <Description>{viewModel.noPhotosSubtitle}</Description>
      </GalleryNoImagesContainerContent>
    </GalleryNoImagesContainer>
  );
};

export default GalleryNoImagesView;
