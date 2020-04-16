import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';

import ViewModel from './ViewModel';

import Typography from 'src/ui/Typography';

interface Props {
  viewModel: ViewModel;
}

const GalleryView: React.FC<Props> = props => {
  const { viewModel } = props;
  const theme = useTheme();

  const [fullscreen, setFullscreen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const imageGalleryRef = useRef<ImageGallery>(null);
  const handleClick = (): void => {
    if (imageGalleryRef.current && !isMobile) {
      imageGalleryRef.current.toggleFullScreen();
    }
  };

  const handleFullscreen = (): void => {
    setFullscreen(!fullscreen);
  };

  return (
    <Box bgcolor="text.primary">
      <Typography component="span" variant="body1" fontWeight="fontWeightLight">
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
          onErrorImageURL={viewModel.defaultImage}
          onScreenChange={handleFullscreen}
          onClick={handleClick}
        />
      </Typography>
    </Box>
  );
};

export default observer(GalleryView);
