import Box from '@material-ui/core/Box';
import {styled, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Typography} from '@vroom-web/ui';
import {observer} from 'mobx-react';
import React, {useRef, useState} from 'react';
import ImageGallery from 'react-image-gallery';

import ListView from './components/ListView';
import NoImagesView from './components/NoImagesView';
import ViewModel from './ViewModel';
import DesktopNavigationView from "@vroom-web/footer-components/src/Vroom/components/Nav/DesktopView";

const GalleryContainer = styled('div')(({theme}) => ({
    display: 'flex',
    margin: theme.spacing(0, 'auto'),
    maxWidth: '1280px',
    width: '100%',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(0),
    },
}));

const GalleryContainerContent = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: `1px solid ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.paper,
}));

const ImageGalleryContainer = styled('div')(({theme}) => ({
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
        padding: theme.spacing(2),
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(0, 1, 1, 1),
    fontWeight: 600,
    fontSize: '24px',
    [theme.breakpoints.only('xs')]: {
        fontSize: '22px',
    },
    fontFamily: 'SantanderHeadline, Arial, sans-serif',
    textAlign: 'center'
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

interface LocalImageGallery extends ImageGallery {
    toggleFullScreen: () => void;
}

interface Props {
    viewModel: ViewModel;
}

const GalleryView: React.FC<Props> = (props) => {
    const {viewModel} = props;
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
        return <NoImagesView viewModel={viewModel}/>;
    }

    if (viewModel.isListView()) {
        return <ListView viewModel={viewModel}/>;
    }

    return (
        <GalleryContainer>
            <GalleryContainerContent>
                <ImageGalleryContainer>
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
                        <>
                            <Title>{viewModel.photosComing}</Title>
                            <Description>{viewModel.stockPhotoBody}</Description>
                        </>
                    )}
                </ImageGalleryContainer>
            </GalleryContainerContent>
        </GalleryContainer>
    );
};

export default observer(GalleryView);
