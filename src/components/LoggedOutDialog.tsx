import Dialog from '@material-ui/core/Dialog';
import { styled as muiStyled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { Button, SkipNavigationLink, VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Footer from '../core/Footer';
import Page from '../Page';
import { Header } from './Header';

const DialogTitle = muiStyled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
  fontFamily: 'Vroom-Sans',
}));

const DialogContent = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: theme.spacing(4),
}));

const DialogBody = muiStyled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 8, 4, 8),
}));

const CreateAccountButton = muiStyled(Button.Primary)(({ theme }) => ({
  width: '50%',
  marginBottom: theme.spacing(2),
}));

const LoginButton = muiStyled(Button.Outline)(({ theme }) => ({
  width: '50%',
  marginBottom: theme.spacing(2),
}));

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  z-index: 5;
`;

const PageContent = styled.div`
  height: 100%;
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: ${(props): string => props.theme.typography.family.body};
`;

const WhiteBox = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

const DialogTitleText = 'Vroom Sell Us Your Car';
const DialogBodyText = 'Create an account or sign in to save this price';
const CreateAccountButtonText = 'CREATE ACCOUNT';
const LogInButtonText = 'LOG IN';

interface Props {
  isLoading: boolean;
}

const LoggedOutDialog: React.FC<Props> = ({ isLoading }) => {
  const handleDialogActions = (location: string) => () => {
    const redirectUrl = `${window.location.pathname}${window.location.search}`;
    window.location.href = `/myaccount/${location}?redirect=${redirectUrl}`;
  };

  return (
    <Page name="Sell Us Your Car | Vroom">
      {isLoading && (
        <WhiteBox>
          <SpinnerContainer>
            <VroomSpinner />
          </SpinnerContainer>
        </WhiteBox>
      )}
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <PageContent id="main-content">
        {!isLoading && (
          <Dialog fullWidth={true} maxWidth={'sm'} open={true}>
            <DialogContent>
              <DialogTitle variant="h2" fontWeight="fontWeightMedium">
                {DialogTitleText}
              </DialogTitle>
              <DialogBody>{DialogBodyText}</DialogBody>
              <CreateAccountButton
                aria-label="create-account-button"
                onClick={handleDialogActions('create')}
              >
                <Typography variant="button" fontWeight={600}>
                  {CreateAccountButtonText}
                </Typography>
              </CreateAccountButton>
              <LoginButton
                aria-label="login-button"
                onClick={handleDialogActions('login')}
              >
                <Typography variant="button" fontWeight={600}>
                  {LogInButtonText}
                </Typography>
              </LoginButton>
            </DialogContent>
          </Dialog>
        )}
      </PageContent>
      <Footer />
    </Page>
  );
};

export default observer(LoggedOutDialog);
