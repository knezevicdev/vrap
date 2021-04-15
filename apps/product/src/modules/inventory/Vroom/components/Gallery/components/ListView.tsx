import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import ViewModel from '../ViewModel';
import GallerySelect from './Select';

interface Props {
  viewModel: ViewModel;
}

const StyledContainer = styled('div')(() => ({
  zIndex: 1101,
  position: 'fixed',
  top: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'white',
  overflowY: 'scroll',
}));

const Header = styled('span')(({ theme }) => ({
  position: 'fixed',
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  paddingBottom: '5px',
}));

const StyledCloseIcon = styled(CloseIcon)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '10px 30px',
}));

const IFrameContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#041022',
  marginTop: '50px',
}));

const SpincarIframe = styled('iframe')(({ theme }) => ({
  position: 'relative',
  margin: 0,
  padding: 0,
  border: 'none',
  height: '60vh',
  width: '100%',
  zIndex: 2,
  [theme.breakpoints.only('xs')]: {
    height: '36vh',
  },
}));

const StyledCircularProgress = styled(CircularProgress)(() => ({
  position: 'absolute',
  zIndex: 1,
}));

const StyledImage = styled('img')(() => ({
  width: '100%',
}));

const ImagesContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(6),
}));

const ImageHeader = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 1),
}));

const FullscreenContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1102,
  position: 'fixed',
  top: 0,
  height: '100%',
  width: '100%',
  backgroundColor: '#041022',
}));

const FullscreenImageContainer = styled('div')(() => ({
  position: 'absolute',
  width: '100%',
}));

const StyledFullscreenExitIcon = styled(FullscreenExitIcon)(({ theme }) => ({
  position: 'absolute',
  height: '50px',
  width: '50px',
  right: 0,
  bottom: 0,
  color: theme.palette.grey[100],
}));

const GalleryListView: React.FC<Props> = ({ viewModel }) => {
  const currentSelection = viewModel.getSelectedGallery();
  //This is to ensure that the list returns to the top when selection is changed
  useEffect(() => {
    const listViewImagesContainer = document.getElementById(
      'listViewImagesContainer'
    );
    listViewImagesContainer && listViewImagesContainer.scrollIntoView();
  }, [currentSelection]);

  const handleCloseIconClick = (): void => {
    viewModel.setListView();
  };
  const images = viewModel.getGalleryImages();

  return (
    <>
      {viewModel.showListViewFullscreen() && (
        <FullscreenContainer>
          <FullscreenImageContainer>
            <StyledImage src={viewModel.showListViewFullscreen()} />
            <StyledFullscreenExitIcon
              onClick={(): void => viewModel.handleListViewFullscreenClose()}
            />
          </FullscreenImageContainer>
        </FullscreenContainer>
      )}
      <StyledContainer>
        <Header>
          <GallerySelect product={viewModel.getCurrentProduct()} />
          <StyledCloseIcon onClick={handleCloseIconClick} />
        </Header>
        <ImagesContainer id="listViewImagesContainer">
          {viewModel.isSpincarView() ? (
            <IFrameContainer>
              <SpincarIframe src={viewModel.getSpincarIframeUrl()}>
                {viewModel.iFrameNotSupported}
              </SpincarIframe>
              <StyledCircularProgress />
            </IFrameContainer>
          ) : (
            images.map(
              (
                image: {
                  original: string;
                  thumbnail: string;
                  description?: string;
                },
                index: number
              ) => {
                return (
                  <React.Fragment key={'listView_' + index}>
                    <ImageHeader>
                      {index + 1}
                      {viewModel.indexSeparator}
                      {images.length}
                    </ImageHeader>
                    <StyledImage
                      src={image.thumbnail}
                      onClick={(): void =>
                        viewModel.handleListViewImageClick(image.original)
                      }
                    />
                  </React.Fragment>
                );
              }
            )
          )}
        </ImagesContainer>
      </StyledContainer>
    </>
  );
};

export default observer(GalleryListView);
