import { SkipNavigationLink, VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import Footer from '../core/Footer';
import Page from '../Page';
import AuthModal from './AuthModal/AuthModal';
import Header from './Header';

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

interface Props {
  isLoading: boolean;
  onSuccessfulLogin: () => void;
}

const LoggedOutDialog: React.FC<Props> = ({ isLoading, onSuccessfulLogin }) => {
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
        {!isLoading && <AuthModal onSuccessfulLogin={onSuccessfulLogin} />}
      </PageContent>
      <Footer />
    </Page>
  );
};

export default observer(LoggedOutDialog);
