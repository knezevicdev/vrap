import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import ViewModel from '../ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

const ImgContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const StyledImg = styled('img')(({ theme }) => ({
  width: '50%',
  height: 'auto',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const GalleryNoImagesView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Box bgcolor="background.paper" py={{ xs: 4, md: 10 }}>
      <ImgContainer maxWidth="xs">
        <StyledImg
          alt={viewModel.defaultImage.alt}
          src={viewModel.defaultImage.src}
        />
      </ImgContainer>
      <Container maxWidth="sm">
        <Box mb={2}>
          <Typography
            fontWeight="fontWeightMedium"
            textAlign="center"
            variant="h2"
          >
            {viewModel.photosComing}
          </Typography>
        </Box>
        <Typography lineHeight="1.3" textAlign="center" variant="h2">
          {viewModel.noPhotosSubtitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default GalleryNoImagesView;
