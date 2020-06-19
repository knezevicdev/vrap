import {styled, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Button, Typography} from '@vroom-web/ui';
import React from 'react';

import Autocomplete from './Autocomplete';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';

const StyledButton = styled(Button)(() => ({
    gridArea: 'b',
    minHeight: '48px',
}));

const StyledAutocomplete = styled(Autocomplete)(() => ({
    gridArea: 'a',
}));

const BrowseLink = styled(ExternalLink)(() => ({
    gridArea: 'l',
}));

const Browse = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
    display: 'flex',
    fontWeight: 600,
    textDecoration: 'underline',
}));

interface Props {
    viewModel: ViewModel;
}

const SearchView: React.FC<Props> = ({viewModel}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const handleMobileButtonClick = (): void => {
        viewModel.handleMobileButtonClick();
    };

    const mobileButton = (
        <StyledButton
            color="secondary"
            onClick={handleMobileButtonClick}
            variant="contained"
            fullWidth
        >
            {viewModel.mobileButtonLabel}
        </StyledButton>
    );

    const browse = (
        <BrowseLink href={viewModel.link.href}>
            <Browse>{viewModel.link.label}</Browse>
        </BrowseLink>
    );

    const desktop = viewModel.isDesktop();
    return desktop ? (
        <>
            {smDown ? mobileButton : <StyledAutocomplete/>}
            {!smDown && browse}
        </>
    ) : (
        <>
            {mdUp ? <StyledAutocomplete/> : mobileButton}
            {mdUp && browse}
        </>
    )
}

export default SearchView;
