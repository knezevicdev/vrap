import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";

interface Props {
    viewModel: ViewModel;
}

const TabsContainer = styled('div')(() => ({

}));

const LicensePlateView: React.FC<Props> = ({}) => {
    return (
        <TabsContainer> LicensePlate</TabsContainer>
    )
};

export default observer(LicensePlateView);
