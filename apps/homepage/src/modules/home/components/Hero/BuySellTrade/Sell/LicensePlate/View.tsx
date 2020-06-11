import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


interface Props {
    viewModel: ViewModel;
}

const TabsContainer = styled('div')(() => ({

}));

const LicensePlateView: React.FC<Props> = ({viewModel}) => {
    return (
        <TabsContainer>
            <TextField placeholder={'License plate'}/>
            <Select
                id="demo-simple-select"
                value={viewModel.getSelectedState()}
                onChange={viewModel.handleChange}
            >
                {viewModel.getStates().map(state => <MenuItem value={state}>{state}</MenuItem>)}
            </Select>
        </TabsContainer>
    )
};

export default observer(LicensePlateView);
