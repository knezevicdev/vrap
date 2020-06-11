import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface Props {
    viewModel: ViewModel;
}

const TabsContainer = styled('div')(() => ({

}));

const VinView: React.FC<Props> = ({}) => {
    return (
        <TabsContainer>
            <TextField placeholder={'VIN Number'}/>
        </TabsContainer>
    )
};

export default observer(VinView);
