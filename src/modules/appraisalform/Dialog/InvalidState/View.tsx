import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  ${addStyleForMobile(`
      display: flex;
      flex-direction: column;
      align-items: center;
  `)};
`;

const Modal = styled.div`
  margin: auto;
  max-width: 580px;
  max-height: 100%;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  boxshadow: rgba(0, 0, 0, 0.2) 0px 0px 3px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${addStyleForMobile(`
      width: 100%;
      height: 100%;
      max-height: 572px;
      margin: auto;
  `)};
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 50px;
  width: 580px;
  text-align: center;
  position: relative;
  overflow-y: scroll;
  ${addStyleForMobile(`
      width: 100%;
      height: 100%;
      padding: 40px 30px;
  `)};
`;

const locationIcon = `${BASE_PATH}/icons/location.svg`;

const ModalImage = styled.div`
  background: url(${locationIcon}) center no-repeat;
  width: 75px;
  height: 66px;
  margin: 0 auto 20px;
`;

const ModalTitle = styled.div`
  font-family: Vroom-Sans;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 1px;
`;

const Line = styled.hr`
  border: 0;
  border-top: 1px solid #0000001a;
  margin: 15px 0;
`;

const ModalDesc = styled.div`
  font-family: 'Calibre-Regular';
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  margin-top: 30px;
`;

const BrowseInventoryCTA = styled(Button.Primary)`
  display: flex;
  margin: 25px auto 15px;
  justify-content: center;
  align-items: center;
  font-family: Calibre-Semibold;
`;

const DialogView: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });

  const goToInventory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push({ pathname: '/cars' }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <Container>
      <Modal>
        <ModalContent>
          <ModalTitle>
            <div>We apologize</div>
          </ModalTitle>
          <Line />
          <ModalImage />
          <ModalDesc>
            Sorry, we are not pricing or purchasing vehicles from your area at
            this time. We apologize for the inconvenience. Thanks for your
            interest. &nbsp;
          </ModalDesc>
          <BrowseInventoryCTA onClick={goToInventory}>
            Browse Inventory
          </BrowseInventoryCTA>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default observer(DialogView);
