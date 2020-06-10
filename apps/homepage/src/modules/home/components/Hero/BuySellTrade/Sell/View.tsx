import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import Tabs from "@material-ui/core/Tabs";
import {styled} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import LicensePlate from "./LicensePlate";
import Vin from "./Vin";


interface Props {
    viewModel: ViewModel;
}

const TabsContainer = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    maxWidth: '570px'
}));

const CustomTab = styled(Tab)(() => ({
    width: '50%'
}));

const SellView: React.FC<Props> = ({viewModel}) => {
    return (
        <TabsContainer>
            <Tabs value={viewModel.getTab()} onChange={viewModel.handleChange}>
                <CustomTab label={viewModel.buyTab}/>
                <CustomTab label={viewModel.sellTab}/>
            </Tabs>
            {viewModel.showLicensePlate() ? <LicensePlate/> : <Vin/>}
        </TabsContainer>
    )
};

export default observer(SellView);
