import {styled} from '@material-ui/core/styles';
import {Button} from '@vroom-web/ui';
import React from 'react';
import ViewModel from './ViewModel';
import Highlight from './Highlight';

const ViewContainer = styled('div')(({theme}) => ({
    display: 'flex',
    maxWidth: '1280px',
    width: '100%',
    background: "#FFFFFF",
    padding: theme.spacing(4, 2),
}));

const ViewContent = styled('div')(({theme}) => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
}));

const ShopNow = styled(Button)(({theme}) => ({
    fontSize: '14px',
    height: '48px',
    width: '100%',
    background: '#EC0000',
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
        background: '#CC0000',
    }
}));

interface Props {
    viewModel: ViewModel;
}

const View: React.FC<Props> = ({viewModel}) => {
    return (
        <ViewContainer>
            <ViewContent>
                <Highlight/>
                <ShopNow
                    onClick={viewModel.handleButtonClick}
                    variant="contained">
                    {viewModel.button}
                </ShopNow>
            </ViewContent>
        </ViewContainer>
    );
};

export default View;
