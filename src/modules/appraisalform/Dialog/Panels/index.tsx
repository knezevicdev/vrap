import React from 'react';

import {
  CloseButtonContainer,
  CloseDialog,
  Container,
  DialogContent,
  Modal,
  PanelGuide,
  SectionDesc,
  SectionTitle,
  StyledIcon,
} from './Style.css';

import { Icons } from 'src/core/Icon';

interface Props {
  closeModalHandler: () => void;
}

const PanelsDialog: React.FC<Props> = ({ closeModalHandler }) => {
  const handleOnKeyDown = (e: any) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      closeModalHandler();
    }
  };

  return (
    <Container>
      <Modal>
        <DialogContent>
          <CloseDialog
            onClick={(): void => closeModalHandler()}
            onKeyDown={handleOnKeyDown}
            data-qa="exact milage close"
            role="button"
            tabIndex={0}
          >
            <CloseButtonContainer>
              <StyledIcon icon={Icons.ClOSE_LARGE} />
            </CloseButtonContainer>
          </CloseDialog>
          <div>
            <SectionTitle>body panels</SectionTitle>
            <SectionDesc>
              The individual pieces that make up the exterior of your vehicle
              are body panels. Bumpers, doors, fenders, grills, and trunks are
              examples of panels.
            </SectionDesc>
            <PanelGuide
              alt=""
              src="https://www.vroom.com/static-assets/images/sell-us-your-car/body-panels-guide.jpg"
            />
          </div>
        </DialogContent>
      </Modal>
    </Container>
  );
};

export default PanelsDialog;
