import { addStyleForMobile, Typography } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import EmailInput from './components/EmailInput';
import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import { postEmailCapture } from 'src/networking/request';

interface Props {
  handleClose: any;
  experimentUUID: any;
  isUserLoggedIn: any;
  viewModel: ViewModel;
}
const EmailModalView: React.FC<Props> = ({
  handleClose,
  experimentUUID,
  isUserLoggedIn,
  viewModel,
}) => {
  const [hasEmailSubmitted, changeHasEmailSubmitted] = useState(false);
  const [isMobile, changeIsMobile] = useState(0);
  useEffect(() => {
    const isMobileWidth = window.innerWidth <= 767 ? 1 : 0;
    changeIsMobile(isMobileWidth);
  }, []);

  const handleEmailSubmit = async (email: string): Promise<void> => {
    viewModel.tracksEmailCapture(
      'Reminder Email Submitted',
      isUserLoggedIn,
      isMobile,
      0,
      false
    );
    try {
      await postEmailCapture(email, experimentUUID);
      changeHasEmailSubmitted(true);
      viewModel.tracksEmailCapture(
        'Remind Me Result Viewed',
        isUserLoggedIn,
        isMobile,
        1,
        'success'
      );
    } catch (e) {
      changeHasEmailSubmitted(false);
      viewModel.tracksEmailCapture(
        'Remind Me Result Viewed',
        isUserLoggedIn,
        isMobile,
        1,
        'fail'
      );
    }
  };

  const handleModalClose = (e: any) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Container>
      <Content className={hasEmailSubmitted ? 'allSet' : ''}>
        <CloseButton onClick={handleModalClose}>
          <Icon icon={Icons.EMAIL_MODAL_CLOSE} />
        </CloseButton>
        {!hasEmailSubmitted && (
          <>
            <Title>{viewModel.title}</Title>
            <Description>{viewModel.description}</Description>
            <EmailContainer>
              <EmailInput handleEmailSubmit={handleEmailSubmit} />
            </EmailContainer>
          </>
        )}
        {hasEmailSubmitted && (
          <>
            <ImgContainer>
              <Icon icon={Icons.EMAIL_All_SET} />
            </ImgContainer>
            <SetText>{viewModel.allSet}</SetText>
          </>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  top: 0;
  position: fixed;
  left: 0;
`;

const Content = styled.div`
  width: 592px;
  height: 315px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  flex-direction: column;
  border-bottom: 4px solid #e7131a;
  margin-top: 120px;

  @media (max-width: 768px) {
    padding: 0 16px;
    width: 100%;
    height: 410px;
    margin-top: 85px;
    max-width: 343px;
    justify-content: flex-start;
    padding-top: 62px;

    &.allSet {
      justify-content: center;
      padding-top: 0px;
    }
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
`;

const Title = styled(Typography.Heading.Three)`
  font-family: Vroom-Sans;
  font-weight: 800;
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 1px;
  padding: 0 120px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  text-align: center;
  color: #041022;

  ${addStyleForMobile(`padding: 0;`)}
`;

const Description = styled(Typography.Body.Regular)`
  font-size: 18px;
  font-weight: 400;
  color: #041022;
  padding: 0 112px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.25px;
  ${addStyleForMobile(`padding: 0;`)}
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 64px;
  height: 48px;
  width: 100%;
  ${addStyleForMobile(`padding: 0;`)}
`;

const ImgContainer = styled.div`
  width: 42px;
  height: 36px;
  margin-bottom: 14px;
`;

const SetText = styled(Typography.Body.Regular)`
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 0.25px;
  font-weight: 600;
`;

export default EmailModalView;
