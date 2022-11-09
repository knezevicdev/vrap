import { observer } from 'mobx-react';
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

interface Props {
  make: string;
}

const DialogView: React.FC<Props> = ({ make }) => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  });

  const goToInventory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push({ pathname: '/cars' });
  };

  return (
    <Container>
      <Modal>
        <ModalContent>
          <ModalTitle>
            <div>Make not supported</div>
          </ModalTitle>
          <Line />
          <ModalImage />
          <ModalDesc>
            Sorry, we are not purchasing {make} vehicles at this time, and are
            unable to provide a price for you.
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
