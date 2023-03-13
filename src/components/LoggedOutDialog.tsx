import {
  Button,
  SkipNavigationLink,
  Typography,
  VroomSpinner,
} from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Footer from '../core/Footer';
import Page from '../Page';
import { Header } from './Header';

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
  z-index: 9999999;
`;

const Dialog = styled.div`
  width: calc(100% - 64px);
  max-width: 600px;
  display: flex;
  max-height: calc(100% - 64px);
  flex-direction: column;
  margin: 32px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  border-radius: 4px;
  color: #041022;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
`;

const DialogTitle = styled(Typography.Title.Two)`
  padding: 2rem;
  font-size: 2.5rem;
  text-align: center;
  font-family: Vroom-Sans, sans-serif;

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;

const DialogContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`;

const DialogBody = styled.p`
  padding: 0px 64px 32px;
  font-size: 18px;
  font-family: Calibre, Arial, sans-serif;
  font-weight: 400;
  line-height: 1;
  letter-spacing: normal;
  margin: 0;

  @media (max-width: 600px) {
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    text-align: center;
  }
`;

const CreateAccountButton = styled(Button.Primary)`
  width: 50%;
  margin-bottom: 1rem;
  font-size: 16px;
  font-family: Calibre, Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1.75px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const LoginButton = styled(Button.Outline)`
  width: 50%;
  margin-bottom: 1rem;
  font-size: 16px;
  font-family: Calibre, Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 1.75px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    width: 80%;
  }
`;

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
          <DialogOverlay>
            <Dialog>
              <DialogContent>
                <DialogTitle>{DialogTitleText}</DialogTitle>
                <DialogBody>{DialogBodyText}</DialogBody>
                <CreateAccountButton
                  aria-label="create-account-button"
                  onClick={handleDialogActions('create')}
                >
                  {CreateAccountButtonText}
                </CreateAccountButton>
                <LoginButton
                  aria-label="login-button"
                  onClick={handleDialogActions('login')}
                >
                  {LogInButtonText}
                </LoginButton>
              </DialogContent>
            </Dialog>
          </DialogOverlay>
        )}
      </PageContent>
      <Footer />
    </Page>
  );
};

export default observer(LoggedOutDialog);
