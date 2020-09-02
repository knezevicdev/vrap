import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Container, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ContactCompletion from '../ContactCompletion';
import Disclaimer from '../Disclaimer';
import ErrorBanner from '../ErrorBanner';
import ViewModel from './ViewModel';

const StyledContainer = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  maxWidth: '900px',
}));

const DoubleBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  [theme.breakpoints.only('xs')]: {
    textAlign: 'center',
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2),
  },
}));

const SubTitle = styled(Typography)(() => ({
  letterSpacing: '0.25px',
  lineHeight: '1.3',
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
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
    fontSize: '18px',
    height: '10px',
  },
  '& .Mui-error input': {
    borderColor: theme.palette.error.main,
  },
  '& .Mui-error.MuiInputLabel-root': {
    color: theme.palette.error.main,
  },
}));

const StyledMessageField = styled(StyledTextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-multiline': {
    flexFlow: 'column',
    height: '180px',
    padding: theme.spacing(2),
    borderRadius: 0,
    border: `1px solid ${theme.palette.grey[400]}`,
    fontSize: '18px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  borderRadius: 0,
  border: `1px solid ${theme.palette.grey[400]}`,
  fontSize: '18px',
  height: '42px',
  backgroundColor: '#fff',
  paddingLeft: '24px',
  color: '#9e9e9e',
  '&:before': {
    borderBottom: 'none',
  },
  '&:after': {
    borderBottom: 'none',
  },
  '&:focus': {
    borderBottom: 'none',
    background: '$labelcolor',
  },
  '& .MuiSelect-select:focus': {
    backgroundColor: '#fff',
    color: 'black',
  },
  '& option:not(:first-of-type)': {
    color: 'black',
  },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: theme.typography.fontWeightLight,
  lineHeight: '32px',
  color: theme.palette.text.primary,
}));

const StyledButton = styled(Button)(() => ({
  minWidth: '200px',
}));

interface Props {
  viewModel: ViewModel;
}

const ContactFormView: React.FC<Props> = ({ viewModel }) => {
  const handleTextFieldChange = (
    name: 'firstName' | 'lastName' | 'email' | 'phone' | 'message'
  ) => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    viewModel.setTextField(name, value);
  };

  const handleSubjectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ): void => {
    const value = event.target.value as string;
    const name = 'subject';
    viewModel.setTextField(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    viewModel.handleSubmit();
  };

  const isSuccess = viewModel.showSuccessBanner();
  const isError = viewModel.setShowErrorBanner();

  return (
    <StyledContainer>
      {isError && <ErrorBanner />}
      {!isSuccess && (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <Box
              mb={{ xs: 2, md: 4, lg: 4 }}
              p={{ xs: 2, md: 4, lg: 4 }}
              border={1}
              borderColor="grey.400"
              bgcolor="background.paper"
            >
              <Box mb={2}>
                <Title variant="h2">{viewModel.title}</Title>
                <SubTitle variant="body1">{viewModel.fillForm}</SubTitle>
              </Box>
              <Box mb={2}>
                <StyledInputLabel id="submit-contact-form-subject-label">
                  {viewModel.subjectPlaceholder}
                </StyledInputLabel>
                <StyledSelect
                  labelId="submit-contact-form-subject-label"
                  required={true}
                  onChange={handleSubjectChange}
                  error={viewModel.subjectError()}
                  native
                >
                  <option value="" hidden>
                    {viewModel.defaultQuestion}
                  </option>
                  {viewModel.zenDeskQuestions.map((question, index) => {
                    return (
                      <option key={index} value={question}>
                        {question}
                      </option>
                    );
                  })}
                </StyledSelect>
              </Box>
              <DoubleBox mb={2}>
                <Box pr={1} width="100%">
                  <StyledTextField
                    autoComplete="off"
                    error={viewModel.firstNameError()}
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
                <StyledTextField
                  autoComplete="off"
                  error={viewModel.lastNameError()}
                  InputLabelProps={{ disableAnimation: true, shrink: true }}
                  InputProps={{ disableUnderline: true }}
                  id="submit-contact-form-last-name"
                  label={viewModel.lastNameLabel()}
                  placeholder={viewModel.lastNamePlaceholder}
                  onChange={handleTextFieldChange('lastName')}
                  required={true}
                  value={viewModel.lastNameValue()}
                />
              </DoubleBox>
              <DoubleBox mb={2}>
                <Box pr={1} width="100%">
                  <StyledTextField
                    autoComplete="off"
                    error={viewModel.emailError()}
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
                <StyledTextField
                  autoComplete="off"
                  error={viewModel.phoneError()}
                  InputLabelProps={{ disableAnimation: true, shrink: true }}
                  InputProps={{ disableUnderline: true }}
                  id="submit-contact-form-phone"
                  label={viewModel.phoneLabel()}
                  placeholder={viewModel.phonePlaceholder}
                  onChange={handleTextFieldChange('phone')}
                  required={true}
                  type="tel"
                  value={viewModel.phoneValue()}
                />
              </DoubleBox>

              <Box mb={2}>
                <StyledMessageField
                  autoComplete="off"
                  error={viewModel.messageError()}
                  fullWidth
                  InputLabelProps={{ disableAnimation: true, shrink: true }}
                  InputProps={{ disableUnderline: true }}
                  id="submit-contact-form-message"
                  label={viewModel.messageLabel()}
                  placeholder={viewModel.messagePlaceholder}
                  onChange={handleTextFieldChange('message')}
                  required={true}
                  value={viewModel.messageValue()}
                  multiline
                />
              </Box>
              <Box alignItems="center" display="flex" flexDirection="column">
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
            <Disclaimer />
          </Box>
        </form>
      )}
      {isSuccess && <ContactCompletion />}
    </StyledContainer>
  );
};

export default observer(ContactFormView);
