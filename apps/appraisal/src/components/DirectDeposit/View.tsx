import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

import DirectDepositViewModel from './ViewModel';

import { Body } from 'src/core/Typography';

const DirectDepositContainer = styled('div')(() => ({
  width: '100%',
}));

const InputContainer = styled('div')(() => ({
  paddingBottom: '20px',
}));

const Input = styled(TextField)(({ theme }) => ({
  width: '280px',
  [theme.breakpoints.only('xs')]: { width: '100%' },
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
  '& .MuiFormHelperText-root': {
    display: 'none',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    display: 'initial',
  },
}));

const DirectDepositCopy = styled(Body.Regular)(() => ({
  display: 'flex',
  padding: '20px 0 15px',
}));

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      <InputContainer>
        <Input
          id="RoutingNumber"
          label={viewModel.routingLabel}
          placeholder={viewModel.routingLabel}
        />
      </InputContainer>
      <InputContainer>
        <Input
          id="BankAccountNumber"
          label={viewModel.bankAccountLabel}
          placeholder={viewModel.bankAccountLabel}
        />
      </InputContainer>
    </DirectDepositContainer>
  );
};

export default DirectDepositView;
