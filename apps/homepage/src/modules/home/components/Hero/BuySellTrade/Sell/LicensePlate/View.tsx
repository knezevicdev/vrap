import React from 'react';
import {observer} from "mobx-react";
import ViewModel from './ViewModel';
import {styled} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Button} from "@vroom-web/ui";

interface Props {
    viewModel: ViewModel;
}

const LicensePlateContainer = styled('div')(() => ({}));

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
    '& input, .MuiSelect-root': {
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

const StateSelect = styled(Input)(({theme}) => ({
    width: theme.spacing(20),
    marginLeft: theme.spacing(3)
}));

const SubmitButton = styled(Button)(() => ({
    width: '100%',
}));

const Inputs = styled('div')(() => ({
    display: 'flex'
}));

const LicensePlateView: React.FC<Props> = ({viewModel}) => {
    const handleButtonClick = (): void => {
        viewModel.navigate();
    };

    return (
        <LicensePlateContainer>
            <Inputs>
                <Input
                    id="license-plate"
                    focused={true}
                    label={viewModel.licensePlateLabel}
                    placeholder={viewModel.licensePlateLabel}
                    value={viewModel.getInputValue()}
                    onChange={viewModel.onChange}
                    InputProps={{disableUnderline: true}}
                />
                <StateSelect
                    id="state"
                    select
                    label={"State"}
                    placeholder={viewModel.licensePlateLabel}
                    value={viewModel.getSelectedState()}
                    onChange={viewModel.handleChange}
                    InputProps={{disableUnderline: true}}
                >
                    {viewModel.getStates().map(state => <MenuItem key={state} value={state}>{state}</MenuItem>)}
                </StateSelect>
            </Inputs>
            <SubmitButton
                disabled={viewModel.isButtonDisabled()}
                onClick={handleButtonClick}
                variant="contained"
                color="secondary">
                {viewModel.buttonLabel}
            </SubmitButton>
        </LicensePlateContainer>
    )
};

export default observer(LicensePlateView);
