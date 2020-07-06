import Box from '@material-ui/core/Box';
import MuiPaper from '@material-ui/core/Paper';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import ListView from './components/ListView';
import NoImagesView from './components/NoImagesView';
import GallerySelect from './components/Select';
import ViewModel from './ViewModel';

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

  const handleFullscreen = (): void => {
    setFullscreen(!fullscreen);
  };

  const handleClick = (): void => {
    isMobile && viewModel.setListView();
  };

  if (viewModel.hasNoImages()) {
    return <NoImagesView viewModel={viewModel} />;
  }

  if (viewModel.isListView()) {
    return <ListView viewModel={viewModel} />;
  }

  return (
    <>
      <GallerySelect product={viewModel.getCurrentProduct()} />
      <Box className={viewModel.showBanner() ? 'stock-photos' : ''}>
        <Typography
          component="span"
          variant="body1"
          fontWeight="fontWeightLight"
        >
          <ImageGallery
            ref={imageGalleryRef}
            items={viewModel.getGalleryImages()}
            showPlayButton={false}
            showNav={!isMobile}
            showThumbnails={viewModel.showThumbnails(isMobile)}
            thumbnailPosition={viewModel.getThumbnailPosition(
              isMobile,
              fullscreen
            )}
            showFullscreenButton={!isMobile}
            indexSeparator={viewModel.indexSeparator}
            useBrowserFullscreen={false}
            showIndex={viewModel.showIndex()}
            onErrorImageURL={viewModel.defaultImage.src}
            onScreenChange={handleFullscreen}
            onClick={handleClick}
          />
        </Typography>
      </Box>
      {viewModel.showBanner() && (
        <Paper elevation={0} square>
          <Container>
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
