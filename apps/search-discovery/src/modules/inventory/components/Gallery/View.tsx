import Box from '@material-ui/core/Box';
import MuiPaper from '@material-ui/core/Paper';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import NoImagesView from './NoImagesView';
import ViewModel from './ViewModel';

import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

//#region Styling
const Paper = styled(MuiPaper)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.grey[400]}`,
  padding: theme.spacing(2, 0),
}));
//#endregion

interface LocalImageGallery extends ImageGallery {
  toggleFullScreen: () => void;
}

interface Props {
  viewModel: ViewModel;
}

const GalleryView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const theme = useTheme();

  const [fullscreen, setFullscreen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const imageGalleryRef = useRef<LocalImageGallery>(null);
  const handleClick = (): void => {
    if (imageGalleryRef.current && !isMobile) {
      imageGalleryRef.current.toggleFullScreen();
    }
  };

  const handleFullscreen = (): void => {
    setFullscreen(!fullscreen);
  };

  if (viewModel.hasNoImages()) {
    return <NoImagesView viewModel={viewModel} />;
  }

  return (
    <>
      <Box
        bgcolor={
          viewModel.showBanner() ? theme.palette.background.paper : 'grey.400'
        }
        className={viewModel.showBanner() ? 'stock-photos' : ''}
      >
        <Typography
          component="span"
          variant="body1"
          fontWeight="fontWeightLight"
        >
          <ImageGallery
            ref={imageGalleryRef}
            items={viewModel.getImages()}
            showPlayButton={false}
            showNav={!isMobile}
            showThumbnails={!isMobile || fullscreen}
            thumbnailPosition={isMobile || fullscreen ? 'bottom' : 'right'}
            showFullscreenButton={!isMobile}
            indexSeparator={viewModel.indexSeparator}
            useBrowserFullscreen={false}
            showIndex={true}
            onErrorImageURL={viewModel.defaultImage.src}
            onScreenChange={handleFullscreen}
            onClick={handleClick}
          />
        </Typography>
      </Box>
      {viewModel.showBanner() && (
        <Paper elevation={0} square>
          <Container content>
            <Box pb={2}>
              <Typography
                variant="body1"
                fontWeight="fontWeightMedium"
                textAlign="center"
              >
                {viewModel.photosComing}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              fontWeight="fontWeightLight"
              textAlign="center"
            >
              {viewModel.stockPhotoBody}
            </Typography>
          </Container>
        </Paper>
      )}
    </>
  );
};

export default observer(GalleryView);
