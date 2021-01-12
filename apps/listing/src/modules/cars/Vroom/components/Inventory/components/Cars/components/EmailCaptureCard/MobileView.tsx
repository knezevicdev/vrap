import { Card, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import EmailCaptureCardViewModel from './ViewModel';

const StyledCard = styled(Card)(() => ({
  width: '100%',
  height: '230px',
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
  paddingTop: theme.spacing(1),
}));

const EmailCaptureDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 2, 2),
  flexGrow: 1,
  justifyContent: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  whiteSpace: 'nowrap',
  paddingBottom: theme.spacing(0.5),
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '18px',
  paddingBottom: theme.spacing(2),
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
  marginTop: theme.spacing(1),
  width: '100%',
}));

interface MobileViewProps {
  viewModel: EmailCaptureCardViewModel;
}

const MobileView: React.FC<MobileViewProps> = ({ viewModel }) => {
  return (
    <Grid item xs={12}>
      <StyledCard>
        <Content>
          <EmailCaptureDetails>
            <Title>Get Inventory Updates</Title>
            <Description>
              Subscribe to updates, and let Vroom help you get into the car
              you’re searching for.
            </Description>
            <div>
              <Input
                id="email-address"
                focused={true}
                label="Email Address"
                placeholder="sample@email.com"
                value={viewModel.getInputValue()}
                onChange={viewModel.onChange}
                // error={viewModel.hasError()}
                // helperText={viewModel.error}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <StyledButton
                color="primary"
                // onClick={DO SOMETHING}
                variant="contained"
              >
                Notify Me
              </StyledButton>
            </div>
          </EmailCaptureDetails>
        </Content>
      </StyledCard>
    </Grid>
  );
};

export default MobileView;
