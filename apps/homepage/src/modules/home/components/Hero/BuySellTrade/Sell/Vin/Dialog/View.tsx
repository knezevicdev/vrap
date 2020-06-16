import React from "react";

import Dialog from '@material-ui/core/Dialog';
import ViewModel from './ViewModel';
import {observer} from "mobx-react";

interface Props {
    viewModel: ViewModel;
}

const VinDialogView: React.FC<Props> = ({viewModel}) => {
    return (
        <Dialog onClose={viewModel.handleClose}
                aria-labelledby="vehicle-identification-number-information"
                open={viewModel.isOpen()}>
            hello
        </Dialog>
    );
};

export default observer(VinDialogView);
