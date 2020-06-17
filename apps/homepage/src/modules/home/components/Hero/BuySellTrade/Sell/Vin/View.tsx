import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import VinDialog from './Dialog';
import { ReactComponent as QuestionSvg } from './svg/question.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const VinContainer = styled('div')(() => ({}));

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInput-formControl': {
    marginTop: theme.spacing(1),
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

const Label = styled('div')(() => ({
  display: 'flex',
  cursor: 'pointer',
  width: 'max-content',
}));

const Question = styled(QuestionSvg)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const VinView: React.FC<Props> = ({ viewModel }) => {
  const label = (
    <Label onClick={viewModel.openDialog}>
      <Typography variant="caption">{viewModel.inputLabel}</Typography>
      <Question />
      <QuestionText variant="caption">
        {viewModel.inputLabelQuestion}
      </QuestionText>
    </Label>
  );

  return (
    <VinContainer>
      <Input
        id="vin"
        focused={true}
        label={label}
        placeholder={viewModel.inputPlaceholder}
        value={viewModel.getInputValue()}
        onChange={viewModel.onChange}
        error={viewModel.hasError()}
        helperText={viewModel.errorMessage}
        InputProps={{ disableUnderline: true, inputProps: { maxLength: 17 } }}
      />
      <SubmitButton
        disabled={viewModel.isButtonDisabled()}
        onClick={viewModel.handleButtonClick}
        variant="contained"
        color="secondary"
      >
        {viewModel.buttonLabel}
      </SubmitButton>
      <VinDialog store={viewModel.store} />
    </VinContainer>
  );
};

export default observer(VinView);
