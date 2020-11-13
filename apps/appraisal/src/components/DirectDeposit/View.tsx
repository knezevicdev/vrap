import { styled } from '@material-ui/core/styles';
import { Field } from 'formik';
import React from 'react';

import DirectDepositViewModel from './ViewModel';

const InputContainer = styled('div')(() => ({
  paddingBottom: '20px',
}));

const Input = styled(Field)(({ theme }) => ({
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

export interface Props {
  viewModel: DirectDepositViewModel;
}

const PayOptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <InputContainer>
        <Input
          id="routingNumber"
          name={'routingNumber'}
          label={viewModel.routingLabel}
          placeholder={viewModel.routingLabel}
        />
      </InputContainer>
      <InputContainer>
        <Input
          id="bankAccountNumber"
          name={'bankAccountNumber'}
          label={viewModel.bankAccountLabel}
          placeholder={viewModel.bankAccountLabel}
        />
      </InputContainer>
    </>
  );
};

export default PayOptionsView;
