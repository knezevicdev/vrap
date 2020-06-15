import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";
import ExternalLink from "src/ui/ExternalLink";
import {Typography} from "@vroom-web/ui";
import Autocomplete from "./Autocomplete";

interface Props {
    viewModel: ViewModel;
}

const BuyContainer = styled('div')(({theme}) => ({
    paddingTop: theme.spacing(1)
}));

const Browse = styled(ExternalLink)(({theme}) => ({
    color: theme.palette.text.primary,
    display: 'flex',
    fontWeight: 600,
}));

interface Props {
    viewModel: ViewModel;
}

const SearchCars = styled(Typography)(() => ({
    letterSpacing: '0.35px',
}));

const BuyView: React.FC<Props> = ({viewModel}) => {
    return (
        <BuyContainer>
            <SearchCars>{viewModel.searchLabel}</SearchCars>
            <Autocomplete/>
            <Browse href={viewModel.link.href}>
                {viewModel.link.label}
            </Browse>
        </BuyContainer>
    )
};

export default observer(BuyView);
