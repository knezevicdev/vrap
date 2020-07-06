import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Container } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import ViewModel from '../ViewModel';
import GalleryConditionEnd from './ConditionEnd';
import GalleryGeneralToCondition from './GeneralToCondition';
import GallerySelect from './Select';

interface Props {
  viewModel: ViewModel;
}

const StyledContainer = styled(Container)(() => ({
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

const StyledImage = styled('img')(() => ({
  width: '100%',
}));

const ImagesContainer = styled('div')(() => ({
  paddingTop: '40px',
}));

const ImageHeader = styled('div')(() => ({
  padding: '15px 0',
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
  const isDefect = viewModel.isDefectView();

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
          {images.map(
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
                    {images.length + 1}
                    <div>{image.description}</div>
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
          )}
        </ImagesContainer>
        {viewModel.showImageHeader(images.length) && (
          <ImageHeader>
            {images.length + 1}
            {viewModel.indexSeparator}
            {images.length + 1}
          </ImageHeader>
        )}
        {isDefect ? <GalleryConditionEnd /> : <GalleryGeneralToCondition />}
      </StyledContainer>
    </>
  );
};

export default observer(GalleryListView);
