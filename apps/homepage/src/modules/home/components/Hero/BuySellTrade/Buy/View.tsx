import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import Autocomplete from "../../Autocomplete";
import {styled} from "@material-ui/core/styles";
import ExternalLink from "../../../../../../ui/ExternalLink";

interface Props {
    viewModel: ViewModel;
}

const Browse = styled(ExternalLink)(({ theme }) => ({
    color: theme.palette.text.primary,
    display: 'flex',
    fontWeight: 600,
}));

interface Props {
    viewModel: ViewModel;
}

const BuyView: React.FC<Props> = ({viewModel}) => {
    return (
        <div>
            <Autocomplete/>
            <Browse href={viewModel.link.href}>
                {viewModel.link.label}
            </Browse>
        </div>
    )
};

export default observer(BuyView);
