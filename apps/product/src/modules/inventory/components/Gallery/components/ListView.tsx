import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from '../ViewModel';
import GalleryConditionEnd from './ConditionEnd';
import GalleryGeneralToCondition from './GeneralToCondition';
import GallerySelect from './Select';

import Container from 'src/ui/Container';

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

const StyledCloseIcon = styled(CloseIcon)(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '10px',
}));

const StyledImage = styled('img')(() => ({
  width: '100%',
}));

const ImageHeader = styled('div')(() => ({
  padding: '10px 0',
}));

const ListViewFullscreenContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1102,
  position: 'fixed',
  top: 0,
  height: '100%',
  width: '100%',
  backgroundColor: '#041022',
  overflow: 'hidden',
}));

const ListViewFullscreenImageContainer = styled('div')(() => ({
  position: 'absolute',
  width: '100%',
}));

const StyledFullscreenExitIcon = styled(FullscreenExitIcon)(({ theme }) => ({
  position: 'absolute',
  height: '50px',
  width: '50px',
  right: 0,
  bottom: 0,
  color: theme.palette.grey[50],
}));

const GalleryListView: React.FC<Props> = ({ viewModel }) => {
  const handleCloseIconClick = (): void => {
    viewModel.setListView();
  };
  const images = viewModel.getGalleryImages();
  const isDefect = viewModel.isDefectView();

  return (
    <>
      {viewModel.showListViewFullscreen() && (
        <ListViewFullscreenContainer>
          <ListViewFullscreenImageContainer>
            <StyledImage src={viewModel.showListViewFullscreen()} />
            <StyledFullscreenExitIcon
              onClick={(): void => viewModel.handleListViewFullscreenClose()}
            />
          </ListViewFullscreenImageContainer>
        </ListViewFullscreenContainer>
      )}
      <StyledContainer>
        <GallerySelect />
        <StyledCloseIcon onClick={handleCloseIconClick} />
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
        {isDefect ? (
          <>
            {images.length > 1 && (
              <ImageHeader>
                {images.length + 1}
                {viewModel.indexSeparator}
                {images.length}
              </ImageHeader>
            )}
            <GalleryConditionEnd />
          </>
        ) : (
          <>
            <ImageHeader>
              {images.length + 1}
              {viewModel.indexSeparator}
              {images.length}
            </ImageHeader>
            <GalleryGeneralToCondition />
          </>
        )}
      </StyledContainer>
    </>
  );
};

export default observer(GalleryListView);
