import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import {
  BrowseInventoryCTA,
  Container,
  Line,
  Modal,
  ModalContent,
  ModalDesc,
  ModalImage,
  ModalTitle,
} from './Style.css';

const InvalidStateDialog: React.FC = () => {
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

export default InvalidStateDialog;
