import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { CloseButton, Modal, Overlay } from './Styled.css';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const Dialog = ({ children, onClose }: Props) => {
  const modalsRoot =
    typeof document !== 'undefined'
      ? document.getElementById('modals-root')
      : null;

  const dialog = (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>
          <svg width={12} height={12} fill="#041022" viewBox="0 0 12 12">
            <path d="M.157 1.282 1.44 0l4.64 4.64L10.56.158l1.282 1.281L7.36 5.922l4.64 4.64-1.281 1.28-4.64-4.639L1.28 12 0 10.719l4.797-4.797-4.64-4.64Z" />
          </svg>
        </CloseButton>
      </Modal>
    </Overlay>
  );

  return <>{modalsRoot ? ReactDOM.createPortal(dialog, modalsRoot) : dialog}</>;
};

export default Dialog;
