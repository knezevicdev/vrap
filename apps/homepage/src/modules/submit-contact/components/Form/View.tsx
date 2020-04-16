import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
import { observer } from 'mobx-react';
import React from 'react';
import reactStringReplace from 'react-string-replace';
import MaskedInput from 'react-text-mask';

import ViewModel from './ViewModel';

import Button from 'src/ui/Button';
import ExternalLink from 'src/ui/ExternalLink';
import Typography from 'src/ui/Typography';

const StyledTypography = styled(Typography)(() => ({
  fontStyle: 'italic',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInput-formControl': {
    marginTop: 0,
  },
  '& .MuiInputLabel-root': {
    position: 'static',
    transform: 'none',
    fontSize: '14px',
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: '32px',
    color: theme.palette.text.primary,
  },
  '& input': {
    padding: theme.spacing(2),
    borderRadius: 0,
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  '& .Mui-error input': {
    borderColor: theme.palette.error.main,
  },
  '& .Mui-error.MuiInputLabel-root': {
    color: theme.palette.error.main,
  },
}));

const PhoneMaskedInput: React.FC<InputBaseComponentProps> = ({
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  autoComplete,
  className,
  id,
  inputRef,
  onChange,
  placeholder,
  required,
  type,
  value,
}) => {
  return (
    <MaskedInput
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      autoComplete={autoComplete}
      className={className}
      id={id}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      onChange={onChange}
      placeholder={placeholder}
      placeholderChar={'\u2000'}
      ref={(ref: MaskedInput | null): void => {
        if (ref) {
          inputRef(ref ? ref.inputElement : null);
        }
      }}
      required={required}
      type={type}
      value={value}
    />
  );
};

const CheckboxOutlineIcon = styled('span')(({ theme }) => ({
  width: '16px',
  height: '16px',
  border: `1px solid ${theme.palette.grey[400]}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledFontControlLabel = styled(FormControlLabel)(({ theme }) => ({
  alignItems: 'flex-start',
  '& .MuiFormControlLabel-label': {
    color: theme.palette.grey[700],
    fontSize: '13px',
    lineHeight: '24px',
  },
}));

const StyledButton = styled(Button)(() => ({
  minWidth: '200px',
}));

const legalPhoneLabelWithLinks = (label: string): React.ReactElement => {
  const label0 = reactStringReplace(label, /<0>(.*)<\/0>/, match => (
    <ExternalLink
      key="vroom-esign-link"
      color="secondary"
      href="https://www.vroom.com/legal/e-sign"
      target="_blank"
    >
      {match}
    </ExternalLink>
  ));
  const label1 = reactStringReplace(label0, /<1>(.*)<\/1>/, match => (
    <ExternalLink
      key="vroom-terms-of-use-link"
      color="secondary"
      href="https://www.vroom.com/legal/terms-of-use"
      target="_blank"
    >
      {match}
    </ExternalLink>
  ));
  const label2 = reactStringReplace(label1, /<2>(.*)<\/2>/, match => (
    <ExternalLink
      key="vroom-financial-privacy-policy-link"
      color="secondary"
      href="https://www.vroom.com/legal/financial-privacy-policy"
      target="_blank"
    >
      {match}
    </ExternalLink>
  ));
  const label3 = reactStringReplace(label2, /<3>(.*)<\/3>/, match => (
    <ExternalLink
      key="vroom-privacy-policy-link"
      color="secondary"
      href="https://www.vroom.com/legal/privacy-policy"
      target="_blank"
    >
      {match}
    </ExternalLink>
  ));
  const label4 = reactStringReplace(label3, /<4>(.*)<\/4>/, match => (
    <ExternalLink
      key="rocket-auto-privacy-policy-link"
      color="secondary"
      href="/rocket-auto-privacy-policy"
      target="_blank"
    >
      {match}
    </ExternalLink>
  ));
  return <>{label4}</>;
};

interface Props {
  viewModel: ViewModel;
}

const FormView: React.FC<Props> = ({ viewModel }) => {
  const handleTextFieldChange = (
    name: 'firstName' | 'lastName' | 'email' | 'phone'
  ) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    viewModel.setTextField(name, value);
  };

  const handleCheckboxChange = (
    name: 'legalTcpaGranted' | 'legalPhoneGranted'
  ) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    viewModel.setCheckbox(name, checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column">
        <Box
          mb={{ xs: 2, md: 4 }}
          p={{ xs: 2, md: 4 }}
          border={1}
          borderColor="grey.400"
          bgcolor="background.paper"
        >
          <Box mb={2}>
            <StyledTypography fontWeight="fontWeightLight" variant="body1">
              {viewModel.headingText}
            </StyledTypography>
          </Box>
          <Box mb={2}>
            <StyledTextField
              autoComplete="off"
              autoFocus={true}
              error={viewModel.firstNameError()}
              fullWidth
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              InputProps={{ disableUnderline: true }}
              id="submit-contact-form-first-name"
              label={viewModel.firstNameLabel()}
              placeholder={viewModel.firstNamePlaceholder}
              onChange={handleTextFieldChange('firstName')}
              required={true}
              value={viewModel.firstNameValue()}
            />
          </Box>
          <Box mb={2}>
            <StyledTextField
              autoComplete="off"
              error={viewModel.lastNameError()}
              fullWidth
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              InputProps={{ disableUnderline: true }}
              id="submit-contact-form-last-name"
              label={viewModel.lastNameLabel()}
              placeholder={viewModel.lastNamePlaceholder}
              onChange={handleTextFieldChange('lastName')}
              required={true}
              value={viewModel.lastNameValue()}
            />
          </Box>
          <Box mb={2}>
            <StyledTextField
              autoComplete="off"
              error={viewModel.emailError()}
              fullWidth
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              InputProps={{ disableUnderline: true }}
              id="submit-contact-form-email"
              label={viewModel.emailLabel()}
              placeholder={viewModel.emailPlaceholder}
              onChange={handleTextFieldChange('email')}
              required={true}
              type="email"
              value={viewModel.emailValue()}
            />
          </Box>

          <Box mb={4}>
            <StyledTextField
              autoComplete="off"
              error={viewModel.phoneError()}
              fullWidth
              InputLabelProps={{ disableAnimation: true, shrink: true }}
              InputProps={{
                disableUnderline: true,
                inputComponent: PhoneMaskedInput,
              }}
              id="submit-contact-form-phone"
              label={viewModel.phoneLabel()}
              placeholder={viewModel.phonePlaceholder}
              onChange={handleTextFieldChange('phone')}
              required={true}
              type="tel"
              value={viewModel.phoneValue()}
            />
          </Box>
          <Box mb={2}>
            <Typography fontWeight="fontWeightLight" variant="body1">
              {viewModel.byClickingSubmitLabel}
            </Typography>
          </Box>
          <Box mb={1}>
            <StyledFontControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={viewModel.legalPhoneGranted()}
                  checkedIcon={
                    <CheckboxOutlineIcon>
                      <CheckBoxSharpIcon style={{ fontSize: '20px' }} />
                    </CheckboxOutlineIcon>
                  }
                  icon={<CheckboxOutlineIcon />}
                  onChange={handleCheckboxChange('legalPhoneGranted')}
                  required={true}
                />
              }
              label={legalPhoneLabelWithLinks(viewModel.legalPhoneLabel)}
            />
          </Box>
          <StyledFontControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={viewModel.legalTcpaGranted()}
                checkedIcon={
                  <CheckboxOutlineIcon>
                    <CheckBoxSharpIcon style={{ fontSize: '20px' }} />
                  </CheckboxOutlineIcon>
                }
                icon={<CheckboxOutlineIcon />}
                onChange={handleCheckboxChange('legalTcpaGranted')}
                required={true}
              />
            }
            label={viewModel.legalTcpaLabel}
          />
        </Box>
        <Box alignSelf={{ xs: 'stretch', sm: 'flex-end' }} display="flex">
          <StyledButton
            color="primary"
            disabled={viewModel.buttonDisabled()}
            type="submit"
            variant="contained"
          >
            {viewModel.showButtonSpinner() ? (
              <CircularProgress size={20} />
            ) : (
              viewModel.buttonLabel
            )}
          </StyledButton>
        </Box>
      </Box>
    </form>
  );
};

export default observer(FormView);
