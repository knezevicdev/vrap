import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";
import {Button} from "@vroom-web/ui";
import TextField from "@material-ui/core/TextField";

interface Props {
    viewModel: ViewModel;
}

const VinContainer = styled('div')(() => ({}));

const Input = styled(TextField)(({theme}) => ({
    width: '100%',
    '& .MuiInput-formControl': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    '& .MuiInputLabel-root': {
        position: 'static',
        transform: 'none',
        fontSize: '14px',
        fontWeight: theme.typography.fontWeightLight,
        lineHeight: '14px',
        color: theme.palette.text.primary,
    },
    '& input': {
        padding: theme.spacing(1, 2),
        border: `1px solid ${theme.palette.grey[400]}`,
    },
    '& .Mui-error input': {
        borderColor: theme.palette.error.main,
    },
    '& .Mui-error.MuiInputLabel-root': {
        color: theme.palette.error.main,
    },
}));

const SubmitButton = styled(Button)(() => ({
    width: '100%',
}));

const VinView: React.FC<Props> = ({viewModel}) => {
    const handleButtonClick = (): void => {
        viewModel.navigate();
    };

    return (
        <VinContainer>
            <Input
                id="vin"
                label={viewModel.inputLabel}
                placeholder={viewModel.inputPlaceholder}
                value={viewModel.getInputValue()}
                onChange={viewModel.onChange}
                InputProps={{disableUnderline: true}}
            />
            <SubmitButton onClick={handleButtonClick} variant="contained" color="secondary">
                {viewModel.buttonLabel}
            </SubmitButton>
        </VinContainer>
    )
};

export default observer(VinView);
