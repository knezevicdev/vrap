import { Card, Grid } from '@material-ui/core';
import { styled, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Button, Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import EmailCaptureCardViewModel from './ViewModel';

const Container = styled(Card)(({ theme }) => ({
  height: '100%',
  minHeight: '230px',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  borderRadius: '0px',
  [theme.breakpoints.up('sm')]: {
    minHeight: '296px',
  },
  [theme.breakpoints.up('xl')]: {
    minHeight: '315px',
  },
}));

const StyledCard = styled(Card)(() => ({
  width: '100%',
  height: '100%',
  boxShadow: 'none',
  borderRadius: '0px',
  backgroundColor: '#f5f5f5',
}));

const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: 0,
  borderRadius: '0px',
  borderTop: 'solid 1px #D6D7DA',
  zIndex: 10,
  paddingTop: theme.spacing(1),
}));

const EmailCaptureDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 2, 2),
  [theme.breakpoints.up('sm')]: {
    flexGrow: 1,
  },
  justifyContent: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  paddingBottom: theme.spacing(1),
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '18px',
  paddingBottom: theme.spacing(4),
}));

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
  '& .MuiFormHelperText-root': {
    display: 'none',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    display: 'initial',
  },
  '& .MuiInputBase-input': {
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: '135px',
  marginTop: theme.spacing(2),
}));

const LegalDescription = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '14px',
  marginTop: theme.spacing(2),
}));

const Loader = styled('img')(() => ({
  width: '100px',
  margin: 'auto',
}));

const SuccessMessage = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  margin: 'auto',
  textAlign: 'center',
}));

const ErrorContent = styled('div')(() => ({
  margin: 'auto',
  textAlign: 'center',
}));

const ErrorTitle = styled(Typography)(() => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
}));

const ErrorDescription = styled(Typography)(() => ({
  fontSize: '16px',
  lineHeight: '24px',
}));

const ErrorButton = styled(Button)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
  '&:hover': {
    backgroundColor: 'unset',
  },
}));

interface ViewProps {
  viewModel: EmailCaptureCardViewModel;
}

const View: React.FC<ViewProps> = ({ viewModel }) => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Container>
        <StyledCard
          style={{
            backgroundImage: xsDown ? 'unset' : `url(${viewModel.fordImg})`,
            backgroundSize: 'cover',
          }}
        >
          <Content>
            {viewModel.getIsLoading() && (
              <Loader src={viewModel.loaderImg} alt="loader" />
            )}
            {viewModel.getIsSuccessful() && (
              <SuccessMessage>
                {viewModel.successSubscribedText}
                <br />
                {viewModel.successThanksText}
              </SuccessMessage>
            )}
            {viewModel.getIsError() && (
              <ErrorContent>
                <ErrorTitle>{viewModel.errorTitleText}</ErrorTitle>
                <ErrorDescription>
                  {viewModel.errorDescriptionText}
                </ErrorDescription>
                <ErrorButton
                  disableRipple={true}
                  disableFocusRipple={true}
                  color="primary"
                  onClick={viewModel.onClick}
                >
                  {viewModel.errorButtonText}
                </ErrorButton>
              </ErrorContent>
            )}
            {viewModel.getShowEmailCaptureForm() && (
              <EmailCaptureDetails>
                <Title>{viewModel.emailCaptureTitleText}</Title>
                <Description>
                  {viewModel.emailCaptureDescriptionText}
                </Description>
                <Input
                  id="email-address"
                  focused={true}
                  label={viewModel.inputLabel}
                  placeholder={viewModel.inputPlaceholder}
                  value={viewModel.getInputValue()}
                  onChange={viewModel.onChange}
                  error={viewModel.getIsValidationError()}
                  helperText={viewModel.validationText}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <StyledButton
                  color="primary"
                  variant="contained"
                  onClick={viewModel.onClick}
                >
                  {viewModel.emailCaptureButtonText}
                </StyledButton>
                <LegalDescription>{viewModel.legalText}</LegalDescription>
              </EmailCaptureDetails>
            )}
          </Content>
        </StyledCard>
      </Container>
    </Grid>
  );
};

export default observer(View);
